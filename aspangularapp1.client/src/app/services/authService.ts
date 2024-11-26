import { computed, Injectable, signal } from '@angular/core';
import {
  AccountInfo,
  createStandardPublicClientApplication,
  IPublicClientApplication,
} from '@azure/msal-browser';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private msal: IPublicClientApplication | null = null;
  private loggedInAccount = signal<AccountInfo|null>(null);

  userName = computed(() => this.loggedInAccount()?.idTokenClaims?.name ?? null);
  userEmail = computed(() => this.loggedInAccount()?.idTokenClaims?.preferred_username ?? null);

  async init() {
    const clientId = '7f75e560-3310-46e3-b423-e765253d2179';
    const tenantId = '1c074e89-8be7-4169-8000-50c1d5934f58';
    this.msal = await createStandardPublicClientApplication({
      auth: {
        clientId,
        authority: `https://login.microsoftonline.com/${tenantId}`,
      },
    });

    this.msal
      .handleRedirectPromise()
      .then(tokenResponse => {
        console.log('tokenResponse', tokenResponse);
        this.loggedInAccount.set(tokenResponse?.account ?? null);
      })
      .catch(error => {
        console.log('tokenResponse error', error);
      });
  }

  async logIn() {
    // msal-browser defaults to using current page for redirect. However nested pages in the SPA are not registered
    // as valid redirects in the Application Registration. Hence forcing origin as the redirect here.
    if (!this.msal) {
      console.log('msal not initialized');
      return;
    }
    await this.msal.loginRedirect({
      scopes: ['user.read', 'mail.send'],
      redirectUri: window.location.origin
    });
  }

  async logOut() {
    if (!this.msal) {
      console.log('msal not initialized');
      return;
    }
    await this.msal.logoutRedirect({});
  }

  get loggedInAccounts(): AccountInfo[] | undefined {
    if (!this.msal) {
      console.log('msal not initialized');
      return;
    }
    return this.msal.getAllAccounts();
  }
}

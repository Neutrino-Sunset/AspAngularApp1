using AspAngularApp1.Server.Model.Data;
using AspAngularApp1.Server.Model.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AspAngularApp1.Server.Controllers
{
   [Route("api/[controller]")]
   [ApiController]
   public class ConsultantsController : ControllerBase
   {
      private readonly AppDbContext _context;

      public ConsultantsController(AppDbContext context)
      {
         _context = context;
      }

      // GET: api/Consultants
      [HttpGet]
      public async Task<ActionResult<IEnumerable<Consultants>>> GetConsultants()
      {
         return await _context.Consultants.ToListAsync();
      }

      // GET: api/Consultants/5
      [HttpGet("{id}")]
      public async Task<ActionResult<Consultants>> GetConsultants(int id)
      {
         var consultants = await _context.Consultants.FindAsync(id);

         if (consultants == null)
         {
            return NotFound();
         }

         return consultants;
      }

      // PUT: api/Consultants/5
      // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
      [HttpPut("{id}")]
      public async Task<IActionResult> PutConsultants(int id, Consultants consultants)
      {
         if (id != consultants.Id)
         {
            return BadRequest();
         }

         _context.Entry(consultants).State = EntityState.Modified;

         try
         {
            await _context.SaveChangesAsync();
         }
         catch (DbUpdateConcurrencyException)
         {
            if (!ConsultantsExists(id))
            {
               return NotFound();
            }
            else
            {
               throw;
            }
         }

         return NoContent();
      }

      // POST: api/Consultants
      // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
      [HttpPost]
      public async Task<ActionResult<Consultants>> PostConsultants(Consultants consultants)
      {
         _context.Consultants.Add(consultants);
         await _context.SaveChangesAsync();

         return CreatedAtAction("GetConsultants", new { id = consultants.Id }, consultants);
      }

      // DELETE: api/Consultants/5
      [HttpDelete("{id}")]
      public async Task<IActionResult> DeleteConsultants(int id)
      {
         var consultants = await _context.Consultants.FindAsync(id);
         if (consultants == null)
         {
            return NotFound();
         }

         _context.Consultants.Remove(consultants);
         await _context.SaveChangesAsync();

         return NoContent();
      }

      private bool ConsultantsExists(int id)
      {
         return _context.Consultants.Any(e => e.Id == id);
      }
   }
}

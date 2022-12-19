using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapibackend.Models;

namespace webapibackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentsController : ControllerBase
    {
        private readonly AppointmentContext _context;
        private readonly GuestContext _guestContext;
        private readonly StaffContext _staffContext;
        private readonly ServiceContext _serviceContext;

        public AppointmentsController(
            AppointmentContext context,
            GuestContext guestContext,
            StaffContext staffContext,
            ServiceContext serviceContext
            )
        {
            _context = context;
            _guestContext = guestContext;
            _staffContext = staffContext;
            _serviceContext = serviceContext;
        }

        // GET: api/Appointments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointments()
        {
            return await _context.Appointments.ToListAsync();
        }

        // GET: api/Appointments/5
        [HttpGet("byid/{id}")]
        public async Task<ActionResult<Appointment>> GetAppointment(long id)
        {
            var appointment = await _context.Appointments.FindAsync(id);

            if (appointment == null)
            {
                return NotFound();
            }

            return appointment;
        }

        [HttpGet("bydate/{startDate}")]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointments(DateTime startDate)
        {
            try { 
            return await _context.Appointments
                .Where(a => 
                a.StartDate.Year == startDate.Year &&
                a.StartDate.Month == startDate.Month &&
                a.StartDate.Day == startDate.Day
                ).ToListAsync();
            } catch (Exception e)
            {
                Console.WriteLine("Exception!");
                Console.WriteLine(e);
            }
            return null!;
        }

        // PUT: api/Appointments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        /*
         *We use PUT for updating existing records.
         *In this app, we use it to reschedule appointments.
         */
        [HttpPut("byid/{id}")]
        public async Task<IActionResult> PutAppointment(long id, Appointment appointment)
        {
            if (id != appointment.Id)
            {
                return BadRequest();
            }
            ValueTask<Guest?> guestTask = _guestContext.Guests.FindAsync(appointment.GuestId);
            ValueTask<Staff?> staffTask = _staffContext.Staffs.FindAsync(appointment.StaffId);
            ValueTask<Service?> serviceTask = _serviceContext.Services.FindAsync(appointment.ServiceId);
            Guest? guest = await guestTask;
            Staff? staff = await staffTask;
            Service? service = await serviceTask;
            if (guest == null)
            {
                Console.WriteLine("No Guest!");
                return Conflict();
            }
            if (staff == null)
            {
                Console.WriteLine("No Staff!");
                return Conflict();
            }
            if (service == null)
            {
                Console.WriteLine("No Service!");
                return Conflict();
            }

            
            DateTime newStartDate = appointment.StartDate;
            DateTime newEndDate = appointment.EndDate;
            if(newStartDate > newEndDate)
            {
                return Conflict();
            }
            bool alreadyBooked = false;
            List<Appointment> appointments = await _context
                .Appointments
                .Where(a => 
                a.StaffId == appointment.StaffId && 
                a.Id != appointment.Id)
                .ToListAsync();
            for(int i = 0; i < appointments.Count; i++)
            {
                Appointment currentAppointment = appointments[i];
                if(currentAppointment.Id == appointment.Id)
                {//this is the appointment we are modifying, so we do not check for schedule conflicts.
                    continue;
                }
                DateTime existingStartDate = appointments[i].StartDate;
                DateTime existingEndDate = appointments[i].EndDate;
                if (//checks to see if the date ranges overlap.
                    (newStartDate >= existingStartDate && newStartDate <= existingEndDate) ||
                    (newEndDate >= existingStartDate && newEndDate <= existingEndDate) ||
                    (existingStartDate >= newStartDate && existingStartDate <= newEndDate) ||
                    (existingEndDate >= newStartDate && existingEndDate <= newEndDate)
                )
                {
                    alreadyBooked = true;
                }
            }
            if(alreadyBooked)
            {
                Console.WriteLine("Already Booked!");
                return Conflict();
            }

            _context.Entry(appointment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppointmentExists(id))
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

        // POST: api/Appointments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Appointment>> PostAppointment(Appointment appointment)
        {
            ValueTask<Guest?> guestTask  = _guestContext.Guests.FindAsync(appointment.GuestId);
            ValueTask<Staff?> staffTask = _staffContext.Staffs.FindAsync(appointment.StaffId);
            ValueTask<Service?> serviceTask = _serviceContext.Services.FindAsync(appointment.ServiceId);
            Guest? guest = await guestTask;
            Staff? staff = await staffTask;
            Service? service = await serviceTask;
            if(guest == null)
            {
                Console.WriteLine("No Guest!");
                return Conflict();
            }
            if(staff == null)
            {
                Console.WriteLine("No Staff!");
                return Conflict();
            }
            if(service == null)
            {
                Console.WriteLine("No Service!");
                return Conflict();
            }
            
            DateTime newStartDate = appointment.StartDate;
            DateTime newEndDate = appointment.EndDate;
            if (newStartDate > newEndDate)
            {//start date can't be after end date.
                Console.WriteLine("Invalid date range!");
                return Conflict();
            }
            bool alreadyBooked = false;
            List<Appointment> appointments = await _context.Appointments.Where(a => a.StaffId == appointment.StaffId).ToListAsync();
            for(int i = 0; i < appointments.Count; i++)
            {
                Console.WriteLine("Id: " + appointments[i].Id);
                Console.WriteLine("Start Date: " + appointments[i].StartDate);
                Console.WriteLine("End Data: " + appointments[i].EndDate);
                Console.WriteLine("Staff Id: " + appointments[i].StaffId);
                DateTime existingStartDate = appointments[i].StartDate;
                DateTime existingEndDate = appointments[i].EndDate;
                if(//checks to see if the date ranges overlap.
                    (newStartDate >= existingStartDate && newStartDate <= existingEndDate) ||
                    (newEndDate >= existingStartDate && newEndDate <= existingEndDate) ||
                    (existingStartDate >= newStartDate && existingStartDate <= newEndDate) ||
                    (existingEndDate >= newStartDate && existingEndDate <= newEndDate)
                )
                {
                    alreadyBooked = true;
                }
            }
            if (alreadyBooked)
            {
                Console.WriteLine("Already Booked!");
                return Conflict();
            }
            else
            {
                Console.WriteLine("Available!");
            }
            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAppointment", new { id = appointment.Id }, appointment);
        }

        // DELETE: api/Appointments/5
        [HttpDelete("byid{id}")]
        public async Task<IActionResult> DeleteAppointment(long id)
        {
            var appointment = await _context.Appointments.FindAsync(id);
            if (appointment == null)
            {
                return NotFound();
            }

            _context.Appointments.Remove(appointment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AppointmentExists(long id)
        {
            return _context.Appointments.Any(e => e.Id == id);
        }
    }
}

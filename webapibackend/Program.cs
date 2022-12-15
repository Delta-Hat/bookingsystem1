using Microsoft.EntityFrameworkCore;
using webapibackend.Models;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddDbContext<GuestContext>(opt =>
    opt.UseInMemoryDatabase("GuestList"));
builder.Services.AddDbContext<StaffContext>(opt =>
    opt.UseInMemoryDatabase("StaffList"));
builder.Services.AddDbContext<ServiceContext>(opt =>
    opt.UseInMemoryDatabase("ServiceList"));
builder.Services.AddDbContext<AppointmentContext>(opt =>
    opt.UseInMemoryDatabase("AppointmentList"));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

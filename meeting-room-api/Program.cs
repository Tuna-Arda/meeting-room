var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Registriere CORS und erlaube Anfragen vom Frontend (z. B. https://localhost:3001)
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy.WithOrigins("https://localhost:3001")  // Passe die URL deines Frontends an
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Optionale OpenAPI-Konfiguration
builder.Services.AddOpenApi();

// Controller oder minimal APIs hinzufügen (bei minimal APIs gibt es hier evtl. nichts weiter)
builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// Aktiviere die CORS-Policy
app.UseCors("FrontendPolicy");

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}

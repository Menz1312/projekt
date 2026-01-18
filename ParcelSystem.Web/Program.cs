using Microsoft.EntityFrameworkCore;
using ParcelSystem.DAL;
using ParcelSystem.Services;

var builder = WebApplication.CreateBuilder(args);

// 1. Konfiguracja Bazy Danych
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ParcelContext>(options =>
    options.UseSqlServer(connectionString));

// 2. Rejestracja Serwisów (Logika Biznesowa)
builder.Services.AddScoped<IAddressService, AddressService>();
builder.Services.AddScoped<IParcelService, ParcelService>();

// 3. Konfiguracja Kontrolerów
builder.Services.AddControllersWithViews();

// 4. Konfiguracja Swaggera (Dokumentacja API)
// To jest kluczowe, żebyś widział stronę /swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 5. Konfiguracja CORS (Dostęp dla Reacta)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// --- Konfiguracja potoku żądań (Pipeline) ---

// Uruchamiamy Swaggera ZAWSZE (nawet jeśli nie jesteś w trybie Development, dla pewności)
app.UseSwagger();
app.UseSwaggerUI();

// Opcjonalnie: Przekierowanie HTTPS (można zakomentować, jeśli są problemy z certyfikatami)
app.UseHttpsRedirection();

app.UseStaticFiles();
app.UseRouting();

// Włączamy CORS
app.UseCors("AllowAll");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
using Sum_Cubits_Application.Features.Holydays;
using System.Globalization;
using System.Text.Json;


namespace Sum_Cubits_Application.Infrastructure.Services
{
    public class HolydayService
    {
        public static async Task<bool> IsHoliday(DateOnly date, HttpClient httpClient)
        {
            try
            {
                var year = date.Year;
                var url = $"https://api.argentinadatos.com/v1/feriados/{year}";
                using var resp = await httpClient.GetAsync(url);
                if (!resp.IsSuccessStatusCode)
                    return false;

                var content = await resp.Content.ReadAsStringAsync();
                if (string.IsNullOrWhiteSpace(content))
                    return false;

                // Estructura esperada: lista de objetos con propiedad "fecha"
                var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
                var holidays = JsonSerializer.Deserialize<List<HolydayDto>>(content, options);
                if (holidays == null || holidays.Count == 0)
                    return false;

                foreach (var h in holidays)
                {
                    if (string.IsNullOrWhiteSpace(h.Fecha))
                        continue;

                    if (DateOnly.TryParse(h.Fecha, CultureInfo.InvariantCulture, DateTimeStyles.None, out var hDate))
                    {
                        if (hDate == date)
                            return true;
                    }
                    else
                    {
                        // Intentar parseo con formatos comunes
                        if (DateOnly.TryParseExact(h.Fecha, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out var hDate2))
                        {
                            if (hDate2 == date)
                                return true;
                        }
                    }
                }

                return false;
            }
            catch
            {
                // En caso de error de red o parseo, considerar que no es feriado para no bloquear la operación
                return false;
            }
        }
    }
}

using System.Reflection;

namespace Sum_Cubits_Api.Installers
{
    public static class MapInstaller
    {
        public static void InstallEndpoints(this IEndpointRouteBuilder app)
        {
            // Buscar en el assembly actual (Sum_Cubits_Api)
            var assembly = typeof(MapInstaller).Assembly;

            var methods = assembly.GetTypes()
                .Where(t => t.IsClass && t.IsPublic && t.IsAbstract && t.IsSealed) // Clases estáticas
                .SelectMany(t => t.GetMethods(BindingFlags.Public | BindingFlags.Static))
                .Where(m => m.Name.StartsWith("Map") &&
                            m.Name.EndsWith("Endpoints") &&
                            m.GetParameters().Length == 1 &&
                            m.GetParameters()[0].ParameterType == typeof(IEndpointRouteBuilder));

            foreach (var method in methods)
            {
                method.Invoke(null, new object[] { app });
            }
        }
    }
}


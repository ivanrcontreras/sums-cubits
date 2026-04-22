FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["Sum-Cubits-Api/Sum-Cubits-Api.csproj", "Sum-Cubits-Api/"]
COPY ["Sum-Cubits-Application/Sum-Cubits-Application.csproj", "Sum-Cubits-Application/"]
RUN dotnet restore "Sum-Cubits-Api/Sum-Cubits-Api.csproj"
COPY . .
WORKDIR "/src/Sum-Cubits-Api"
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Sum-Cubits-Api.dll"]
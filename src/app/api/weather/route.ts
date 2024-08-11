import { NextRequest, NextResponse } from "next/server";

//localhost:3000/api/weather
export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const address: string | null = searchParams.get("address");

  const App_Id = process.env.NEXT_PUBLIC_WEATHER_APP_ID;


  if (!address) {
    throw new Error('City name is required field');
  }

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=${App_Id}`;
  const hourlyForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${address}&appid=${App_Id}`;

  try {
    const [currentWeatherRes, hourlyForecastRes] = await Promise.all([
      fetch(currentWeatherUrl),
      fetch(hourlyForecastUrl)
    ]);

    if (!currentWeatherRes.ok || !hourlyForecastRes.ok) {
      throw new Error("Failed to fetch weather data.");
    }

    const [currentWeatherData, hourlyForecastData] = await Promise.all([
      currentWeatherRes.json(),
      hourlyForecastRes.json()
    ]);

    return NextResponse.json({ currentWeather: currentWeatherData, hourlyForecast: hourlyForecastData });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error('Failed to fetch weather data.');
  }
}

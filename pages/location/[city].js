import React from "react";
import cities from "../../lib/city.list.json";
import Head from "next/head";
import TodaysWeather from "../../components/TodaysWeather";
import moment from "moment-timezone";
import HourlyWeather from "../../components/HourlyWeather";
import WeeklyWeather from "../../components/WeeklyWeather";
import SearchBox from "../../components/SearchBox";
import Link from "next/link";

export async function getServerSideProps(context) {
  const city = getCity(context.params.city);
  console.log(city);

  if (!city) {
    return {
      notFound: true,
    };
  }
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${process.env.NEXT_PUBLIC_KEY}&exclude=minutely&units=metric`
  );
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }
  //console.log(data);
  const hourlyWeather = getHourlyWeather(data.hourly, data.timezone);
  //console.log(hourlyWeather);

  const slug = context.params.city;

  return {
    props: {
      city: city,
      timezone: data.timezone,
      currentWeather: data.current,
      dailyWeather: data.daily,
      hourlyWeather: hourlyWeather,
      //slug: slug,
      //data: data,
    },
  };
}

const getCity = (param) => {
  const cityParam = param.trim();
  const splitCity = cityParam.split("-");
  const id = splitCity[splitCity.length - 1];
  console.log(id);

  if (!id) {
    return null;
  }

  const city = cities.find((city) => city.id.toString() == id);

  if (city) {
    return city;
  } else {
    return null;
  }
};

const getHourlyWeather = (hourlyData, timezone) => {
  /*const current = new Date();
  current.setHours(current.getHours(), 0, 0, 0);
  const tomorrow = new Date(current);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  //to get timestamps in sec divide by 1000

  const currentTimeStamp = Math.floor(current.getTime() / 1000);
  const tomorrowTimeStamp = Math.floor(tomorrow.getTime() / 1000);*/

  const endOfDay = moment().tz(timezone).endOf("day").valueOf();
  const eodTimeStamp = Math.floor(endOfDay / 1000);

  const todaysData = hourlyData.filter((data) => data.dt < eodTimeStamp);
  return todaysData;
};

const City = ({
  city,
  hourlyWeather,
  currentWeather,
  dailyWeather,
  timezone,
}) => {
  console.log(hourlyWeather);
  return (
    <div>
      <Head>
        <title>{city.name} Weather </title>{" "}
      </Head>

      <div className="page-wrapper">
        <div className="container">
          <Link href="/" className="back-link">
            &larr;Home
          </Link>
          <SearchBox placeholder="Search for another location..." />
          <TodaysWeather
            city={city}
            weather={dailyWeather[0]}
            timezone={timezone}
          />
          <HourlyWeather hourlyWeather={hourlyWeather} timezone={timezone} />
          <WeeklyWeather weeklyWeather={dailyWeather} timezone={timezone} />
        </div>
      </div>
    </div>
  );
};

export default City;

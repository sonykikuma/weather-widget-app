import React from "react";
import Image from "next/image";
import Link from "next/link";

const places = [
  {
    name: "London",
    image: "/images/london.jpg",
    url: "/location/london-2643743",
    currency: "Pound Sterling  £",
  },
  {
    name: "Moscow",
    image: "/images/moscow.jpg",
    url: "/location/moscow-524894",
    currency: "Russian Ruble  ₽",
  },
  {
    name: "Tokyo",
    image: "/images/tokyo.jpg",
    url: "/location/tokyo-1850147",
    currency: "Japanese Yen  ¥",
  },
  {
    name: "Newyork",
    image: "/images/new-york.jpg",
    url: "/location/new-york-city-5128581",
    currency: "American Dollar  $ ",
  },
  {
    name: "Mumbai",
    image: "/images/Gateway-of-India.jpg",
    url: "/location/mumbai-1275339",
    currency: "Indian Rupee  ₹",
  },
  {
    name: "Dubai",
    image: "/images/dubai.jpg",
    url: "/location/dubai-292223",
    currency: "UAE Dirham  د.إ ",
  },
  {
    name: "Toronto",
    image: "/images/toronto.jpg",
    url: "/location/toronto-6167865",
    currency: "Canadian Dollar  $",
  },
];

const FamousPlaces = () => {
  return (
    <div className="places">
      <div className="places__row">
        {places.length > 0 &&
          places.map((place, index) => (
            <div className="places__box" key="index">
              <Link href={place.url}>
                <div className="places__image-wrapper">
                  <Image
                    src={place.image}
                    alt={`${place.name} Image`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <span>{place.name}</span>
                <p>{place.currency}</p>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FamousPlaces;

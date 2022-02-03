import React from "react";
import CarCard from "../CarComponents/CarCard";
import PageTitle from "../Layout/PageTitle";

export default function HomePage() {
    const [car, setCar] = React.useState([]); 

    React.useEffect(() => {
        setCar([
          {
            image: "/carImage.jpeg",
            company: "Volkswagen",
            model: "Golf GTI",
            year: "2021",
            used: "02",
            engine: "3.0 Litre",
            km: "27,000",
            price: "12,000$",
          },
          {
            image: "/mini.jpeg",
            company: "Mini",
            model: "JCW",
            year: "2020",
            used: "01",
            engine: "3.0 Litre",
            km: "37,000",
            price: "22,000$",
          },
          {
            image: "/lamb.jpeg",
            company: "Lamborghini",
            model: "Huracán SPYDER 5.2",
            year: "2021",
            used: "00",
            engine: "5.2 Litre",
            km: "2,000",
            price: "170,000$",
          },
          {
            image: "/carImage.jpeg",
            company: "Volkswagen",
            model: "Golf GTI",
            year: "2021",
            used: "02",
            engine: "3.0 Litre",
            km: "27,000",
            price: "12,000$",
          },
          {
            image: "/mini.jpeg",
            company: "Mini",
            model: "JCW",
            year: "2020",
            used: "01",
            engine: "3.0 Litre",
            km: "37,000",
            price: "22,000$",
          },
          {
            image: "/lamb.jpeg",
            company: "Lamborghini",
            model: "Huracán SPYDER 5.2",
            year: "2021",
            used: "00",
            engine: "5.2 Litre",
            km: "2,000",
            price: "170,000$",
          },
          {
            image: "/mini.jpeg",
            company: "Mini",
            model: "JCW",
            year: "2020",
            used: "01",
            engine: "3.0 Litre",
            km: "37,000",
            price: "22,000$",
          },
          {
            image: "/lamb.jpeg",
            company: "Lamborghini",
            model: "Huracán SPYDER 5.2",
            year: "2021",
            used: "00",
            engine: "5.2 Litre",
            km: "2,000",
            price: "170,000$",
          },
        ]);
    },[]);

    if(car == null) return ''; 

    return (
      <>
        <PageTitle page={"Home Page"} />
        <div className="cars-grid pr-1 pl-1">
          {car.map((c) => {
            return (
              <CarCard
                image={c.image}
                company={c.company}
                model={c.model}
                year={c.year}
                used={c.used}
                engine={c.engine}
                km={c.km}
                price={c.price}
              />
            );
          })}
        </div>
      </>
    );

}


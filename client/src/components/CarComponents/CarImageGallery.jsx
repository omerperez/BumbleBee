import React, {useState, useEffect} from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import DealerCard from "./DealerCard";
import { useAuth } from "../../contexts/AuthContext";

export default function CarImageGallery({ id, car }) {
  
  const url = "https://firebasestorage.googleapis.com/v0/b/bumblebee-d5c23.appspot.com/o/files%2F";
  const [dealer, setDealer] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/user/my-user/` + id)
      .then((response) => response.json())
      .then((data) => {
        setDealer(data)
        console.log(data);
      });
  }, [id]);

  // if (dealer == null) return " ";
  return (
    <>
      <div className="pl-1 pr-1" style={{ display: "flex" }}>
        <ImageList
          style={{
            flexBasis: "17%",
            height: 450,
            border: "solid 3px black",
          }}
          gap={0}
          sx={{ width: 200, height: 500 }}
          cols={1}
        >
          {car.images
            ? car.images.map((img) => {
                <ImageListItem key={img + "-" + car.dateForImages}>
                  <img
                    src={`${url + car.dateForImages}-${img}`}
                    srcSet={`${url + car.dateForImages}-${img}`}
                  />
                </ImageListItem>;
              })
            : null}
        </ImageList>
        <div style={{ flexBasis: "50%", height: 450 }}>
          <img
            src={
              car.images
                ? url +
                  car.images[0].substring(0, car.images[0].indexOf(",")) +
                  "?alt=media"
                : null
            }
            width={"100%"}
            height={450}
            style={{ border: "solid 3px black", borderLeft: "none" }}
          />
        </div>
        <div style={{ flexBasis: "33%", marginLeft: "1%" }}>
          <DealerCard
            firstName={dealer ? dealer.firstName : null}
            lastName={dealer ? dealer.lastName : null}
            email={dealer ? dealer.email : null}
            phoneNumber={"+972-522520484"}
            image={"/profileImage.png"}
          />
        </div>
      </div>
    </>
  );
}

// const itemData = [
//   {
//     img: "/mini.jpeg",
//   },
//   {
//     img: "/mini.jpeg",
//   },
//   {
//     img: "/mini.jpeg",
//   },
//   {
//     img: "/mini.jpeg",
//   },
//   {
//     img: "/mini.jpeg",
//   },
//   {
//     img: "/mini.jpeg",
//   },
//   {
//     img: "/mini.jpeg",
//   },
// ];

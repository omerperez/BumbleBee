import React, {useState, useEffect} from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import DealerCard from "./DealerCard";

export default function CarImageGallery({id}) {

    const [dealer, setDealer] = useState();
    useEffect(() => {
        fetch("http://localhost:8080/user/my-user/" + id)
          .then((response) => response.json())
          .then((data) => setDealer(data));
    })

    if(dealer == null ) return " "
    
  return (
    <>
      <div className="pl-1 pr-1" style={{ display: "flex" }}>
        <ImageList
          style={{
            flexBasis: 250,
            height: 450,
            border: "solid 3px black",
          }}
          gap={0}
          sx={{ width: 200, height: 500 }}
          cols={1}
        >
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img src={item.img} srcSet={item.img} />
            </ImageListItem>
          ))}
        </ImageList>
        <div style={{ flexBasis: 625, height: 450 }}>
          <img
            src={"/mini.jpeg"}
            width={750}
            height={450}
            style={{ border: "solid 3px black", borderLeft: "none" }}
          />
        </div>
        <div style={{ flexBasis: 500, marginLeft: "2%" }}>
          <DealerCard
            firstName={dealer.firstName}
            lastName={dealer.lastName}
            email={dealer.email}
            phoneNumber={"+972-522520484"}
            image={"/profileImage.png"}
          />
        </div>
      </div>
    </>
  );
}

const itemData = [
  {
    img: "/mini.jpeg",
  },
  {
    img: "/mini.jpeg",
  },
  {
    img: "/mini.jpeg",
  },
  {
    img: "/mini.jpeg",
  },
  {
    img: "/mini.jpeg",
  },
  {
    img: "/mini.jpeg",
  },
  {
    img: "/mini.jpeg",
  },
];

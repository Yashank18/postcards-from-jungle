import React from "react";
import { Result } from "./types";
import { Box, Image } from "@mantine/core";
import { getAnimalColorMap, getAnimalImage } from "./utils";

interface Props {
  data: Result;
}

const Postcard = (props: Props) => {
  const animalImage = getAnimalImage(props.data.animal);
  const animalColors = getAnimalColorMap(props.data.animal);

  return (
    <Box style={{ backgroundColor: "#FFFFF0", position: "relative" }}>
      <div style={{ position: "relative" }}>
        <Box
          style={{
            backgroundColor: animalColors?.primary,
            mixBlendMode: "lighten",
            width: 400,
            height: 400,
            position: "absolute",
            zIndex: 1,
            top: 0,
            left: 0,
          }}
        />
        <Image
          src={animalImage}
          alt={props.data.animal}
          width={400}
          style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
        />
      </div>
      <div>
        <h3 style={{ color: animalColors?.primary }}>{props.data.animal}</h3>
        <ul style={{ color: animalColors?.primary }}>
          {props.data.traits.map((trait, index) => (
            <li key={index}>{trait}</li>
          ))}
        </ul>
        <p style={{ color: animalColors?.primary }}>{props.data.summary}</p>
        <p style={{ color: animalColors?.primary }}>{props.data.quote}</p>
      </div>
    </Box>
  );
};

export default Postcard;

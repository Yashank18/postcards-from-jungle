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
    <Box style={{ backgroundColor: "#FFFFF0", position: "relative", display: 'flex' }}>
      <div> 
        <Image
          src={animalImage}
          alt={props.data.animal}
          width={400}
        />
        <div
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
      </div>
      <div>
        <h1 style={{ color: animalColors?.primary }}>{props.data.animal}</h1>
        {props.data.traits.length > 0 && <p style={{ color: animalColors?.primary }}>{props.data.traits.join(", ")}</p>}
        <p style={{ color: animalColors?.primary }}>{props.data.summary}</p>
        <p style={{ color: animalColors?.primary }}>{props.data.quote}</p>
      </div>
    </Box>
  );
};

export default Postcard;

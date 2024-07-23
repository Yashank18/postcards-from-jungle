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
    <Box
      w={1000}
      h={400}
      style={{
        backgroundColor: "#FFFFF0",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: 'space-between',
        gap: 20,
        padding: 20
      }}
    >
      <Image
        src={animalImage}
        alt={props.data.animal}
        width={300}
      />
      <div>
        <h1 style={{ color: animalColors?.primary }}>{props.data.animal}</h1>
        {props.data.traits.length > 0 && (
          <p style={{ color: animalColors?.primary }}>
            {props.data.traits.join(", ")}
          </p>
        )}
        <p style={{ color: animalColors?.primary }}>{props.data.summary}</p>
        <p style={{ color: animalColors?.primary }}>{props.data.quote}</p>
      </div>
    </Box>
  );
};

export default Postcard;

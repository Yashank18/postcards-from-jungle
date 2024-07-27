import {
  Box,
  Button,
  clsx,
  createStyles,
  Flex,
  Image,
  Stack,
  Text,
} from "@mantine/core";
import { IconArrowBackUp, IconArrowForwardUp } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Noto_Serif as Serif,
  Nanum_Pen_Script as Handwriting,
} from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { Result } from "./types";
import { getAnimalColorMap, getAnimalImage } from "./utils";
import { font, fontBold } from "@/pages";

interface Props {
  data: Result;
  userName: string;
}

const notoserif = Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

const handwriting = Handwriting({
  subsets: ["latin"],
  weight: "400",
});

const postfix = "But hey, this is you; and you are awesome!";

const animalsInHindi = new Map([
  ['Tiger', 'बाघ'],
  ['Owl', 'उल्लू'],
  ['Wolf', 'भेड़िया'],
  ['Dolphin', 'डॉल्फिन'],
  ['Deer', 'हिरण'],
  ['Rabbit', 'खरगोश'],
  ['Elephant', 'हाथी'],
  ['Bear', 'भालू'],
  ['Horse', 'घोड़ा'],
  ['Eagle', 'चील'],
  ['Panda', 'पांडा'],
  ['Sheep', 'भेड़']
]);

const Postcard = (props: Props) => {
  const animalImage = getAnimalImage(props.data.animal);
  const animalColors = getAnimalColorMap(props.data.animal);
  const { classes } = useStyles();
  const [lines, setLines] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);

  const fullText = props.data.author
    ? props.data.quote + " -- " + props.data.author
    : props.data.quote;

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      console.log(containerWidth);
      const words = fullText.split(" ");
      let currentLine = "";
      const tempLines: string[] = [];

      words.forEach((word) => {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const testDiv = document.createElement("div");
        testDiv.style.position = "absolute";
        testDiv.style.visibility = "hidden";
        testDiv.style.width = `${containerWidth}px`;
        testDiv.style.fontSize = "16px";
        testDiv.style.fontFamily = notoserif.style.fontFamily;
        testDiv.style.overflow = "hidden";
        testDiv.style.whiteSpace = "nowrap";
        testDiv.textContent = testLine;
        document.body.appendChild(testDiv);

        if (testDiv.scrollWidth <= containerWidth) {
          currentLine = testLine;
        } else {
          tempLines.push(currentLine);
          currentLine = word;
        }

        document.body.removeChild(testDiv);
      });

      if (currentLine) {
        tempLines.push(currentLine);
      }

      // Ensure there are at least 3 lines
      while (tempLines.length < 3) {
        tempLines.push("~");
      }

      console.log(tempLines);
      setLines(tempLines);
    }
  }, [fullText]);

  return (
    <Box className={classes.flipCardContainer}>
      <AnimatePresence>
        {!flipped ? (
          <motion.div
            key="back"
            initial={{ rotateY: 180 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: 180 }}
            transition={{ duration: 0.6 }}
            style={{ position: "absolute" }}
          >
            <Box
              w={576}
              h={384}
              style={{
                backgroundColor: "#F2E7CE",
                position: "relative",
                display: "flex",
                justifyContent: "space-between",
                gap: 40,
                padding: 36,
              }}
            >
              <Image
                className={classes.image}
                src={animalImage}
                alt={props.data.animal}
                maw={200}
              />
              <Box className={classes.root} ref={containerRef}>
                <Flex gap={4} direction={"column"}>
                  <Text
                    className={classes.title}
                    style={{ color: animalColors?.primary }}
                  >
                    {props.data.animal} / <span className={classes.titleHindi}>{animalsInHindi.get(props.data.animal)}</span>
                  </Text>
                  {props.data.traits.length > 0 && (
                    <Text
                      style={{ color: animalColors?.primary, fontSize: 14 }}
                      className={notoserif.className}
                    >
                      {Array.from(new Set(props.data.traits))
                        .slice(0, 4)
                        .join(", ")}
                    </Text>
                  )}
                </Flex>
                <Flex direction={"column"} gap={10}>
                  {lines.map((line, index) => (
                    <Text
                      key={index}
                      className={clsx(notoserif.className, classes.lineText)}
                      style={{ color: animalColors?.primary }}
                    >
                      <span>{line}</span>
                      <div className={classes.underline}></div>
                    </Text>
                  ))}
                </Flex>
              </Box>
              <Flex
                direction={"row-reverse"}
                w={"100%"}
                style={{ position: "absolute", bottom: 24, right: 24 }}
              >
                <Button
                  variant="subtle"
                  size="xs"
                  onClick={() => setFlipped(true)}
                  rightIcon={<IconArrowForwardUp />}
                >
                  Flip postcard
                </Button>
              </Flex>
            </Box>
          </motion.div>
        ) : (
          <motion.div
            key="front"
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 180 }}
            exit={{ rotateY: 0 }}
            transition={{ duration: 0.6 }}
            style={{ position: "absolute" }}
          >
            <Box
              w={576}
              h={384}
              style={{
                backgroundColor: "#F2E7CE",
                position: "relative",
                padding: 36,
                transform: "rotateY(180deg)",
              }}
            >
              <Stack spacing={4} style={{ color: "#212121" }}>
                <Text
                  className={handwriting.className}
                  style={{ fontSize: 32, color: animalColors?.secondary }}
                >
                  Hey @{props.userName},
                </Text>
                <Text
                  className={handwriting.className}
                  style={{ fontSize: 20, color: animalColors?.secondary }}
                >
                  {props.data.summary + " " + postfix}
                </Text>
                <Flex direction={"row-reverse"} w={"100%"} mt={10}>
                  <Text
                    className={handwriting.className}
                    style={{ fontSize: 20, color: animalColors?.secondary }}
                  >
                    {" "}
                    - from{" "}
                    <a
                      className={classes.mutedLink}
                      href="https://x.com/viveknigam_"
                    >
                      vivek
                    </a>{" "}
                    &{" "}
                    <a
                      className={classes.mutedLink}
                      href="https://x.com/Yashank17"
                    >
                      yashank
                    </a>
                  </Text>
                </Flex>
              </Stack>
              <Flex
                direction={"row-reverse"}
                w={"100%"}
                style={{ position: "absolute", bottom: 24, right: 24 }}
              >
                <Button
                  variant="subtle"
                  size="xs"
                  onClick={() => setFlipped(false)}
                  leftIcon={<IconArrowBackUp />}
                >
                  Flip postcard
                </Button>
              </Flex>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Postcard;

const useStyles = createStyles((theme) => ({
  flipCardContainer: {
    perspective: "1000px",
    width: 576,
    height: 384,
    boxShadow:
      "0px 0.4px 0.3px rgba(0, 0, 0, 0.035),0px 2px 3.1px rgba(0, 0, 0, 0.061),0px 5.3px 9.1px rgba(0, 0, 0, 0.079),0px 11.4px 19.8px rgba(0, 0, 0, 0.092),0px 22.6px 38.9px rgba(0, 0, 0, 0.102),0px 49px 85px rgba(0, 0, 0, 0.14)",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    gap: 40,
    position: "relative",
    width: 500,
    backfaceVisibility: "hidden",
    transformStyle: "preserve-3d",
    //Soft shadow
  },
  image: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 50,
    fontWeight: fontBold.style.fontWeight,
    fontFamily: fontBold.style.fontFamily,
    letterSpacing: -5,
    lineHeight: 1.2,
  },
  titleHindi: {
    fontSize: 50,
    fontWeight: 400,
    fontFamily: fontBold.style.fontFamily,
    letterSpacing: -5,
    lineHeight: 1.2,
  },

  lineText: {
    fontSize: 16,
    fontWeight: 400,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    lineHeight: 1.5,
    "& span": {
      whiteSpace: "nowrap",
      fontSize: 16,
    },
    "& span:after": {
      content: '" "',
      visibility: "hidden",
    },
    "& span:before": {
      content: "attr(data-placeholder)",
      color: "transparent",
    },
  },
  underline: {
    marginTop: 4,
    width: "100%",
    height: 2,
    backgroundColor: "#ab9d7d",
  },
  mutedLink: {
    color: "inherit",
    ":link": {
      color: "inherit",
    },
    ":visited": {
      color: "inherit",
    },
    ":hover": {
      color: "inherit",
    },
    ":active": {
      color: "inherit",
    },
  },
}));

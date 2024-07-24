// basic React page with a title in center and a button

import { Button, Container, createStyles } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconArrowRight } from "@tabler/icons-react";

export default function LandingPage(props: { onNext: () => void }) {
  const { classes } = useStyles();
  const largerThanMd = useMediaQuery("(min-width: 768px)");

  return (
    <Container size="md" style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 className={classes.heading}>Postcards from the jungle</h1>
      <Button
        color="orange"
        size={largerThanMd ? "xl" : "md"}
        onClick={props.onNext}
        rightIcon={<IconArrowRight />}
      >
        Find your tribe
      </Button>
    </Container>
  );
}

const useStyles = createStyles((theme) => ({
  heading: {
    color: '#fffff0',
    fontWeight: 800,
    letterSpacing: -5,
    lineHeight: 1,
    fontSize: 60,
    [theme.fn.largerThan("sm")]: {
      fontSize: 80,
      letterSpacing: -6,
    },
    [theme.fn.largerThan("lg")]: {
      fontSize: 100,
    }
  },
}));

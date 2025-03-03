import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import { getContrastText } from "./utils";
import { useEffect, useState } from "react";

export const VizCard = ({
  name,
  url,
  img,
  description,
}: {
  name: string;
  url: string;
  img: string;
  description: string;
}) => {
  const theme = useTheme();
  const [textColor, setTextColor] = useState("#000");
  useEffect(() => {
    setTextColor(getContrastText({ imageId: img }));
  }, [img]);
  return (
    <Link href={url}>
      <Card
        variant="outlined"
        sx={{
          minHeight: 250,
          maxHeight: 300,
          border: "1px solid gray",
          position: "relative",
          transition: "0.2s",
          "&:hover": {
            transform: "scale(1.05)",
            webkitBoxShadow: "0px 0px 80px 15px rgba(0,47,189,0.9)",
            MozBoxShadow: "0px 0px 80px 15px rgba(0,47,189,0.9)",
            boxShadow: "0px 0px 80px 15px rgba(0,47,189,0.9)",
            ".MuiCardContent-root": {
              opacity: 1,
              transition: "0.2s opacity",
            },
            ".text": {
              opacity: 1,
              transition: "1s opacity 0.2s",
            },
          },
        }}
      >
        <CardMedia
          component="img"
          id={img}
          image={`/src/assets/charts-imgs/${img || "chart.png"}`}
          alt={`${name}-viz`} // project name
          sx={{
            height: 300,
            objectFit: "cover",
            position: "absolute",
          }}
        />
        <CardContent
          sx={{
            background: "#1f3d4738",
            opacity: 0,
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            padding: 0,
            position: "absolute",
            bottom: 0,
            right: 0,
            top: 0,
            "&:last-child": {
              paddingBottom: 0,
            },
          }}
        >
          <Box
            className="text"
            sx={{
              opacity: 0,
              m: theme.spacing(1.5),
              padding: theme.spacing(1),
              background: "#00000040",
              borderRadius: theme.spacing(1),
            }}
          >
            <Typography
              gutterBottom
              variant="h6"
              sx={{
                mb: 0,
                lineHeight: "normal",
                color: textColor,
              }}
            >
              {name}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: 10, color: textColor }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
              {description}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

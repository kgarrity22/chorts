import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Link,
  Typography,
  useTheme,
} from "@mui/material";

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
  return (
    <Link href={url}>
      <Card
        variant="outlined"
        sx={{
          minHeight: 250,
          maxHeight: 300,
          position: "relative",
          transition: "0.2s",
          "&:hover": {
            transform: "scale(1.1)",
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
            sx={{ opacity: 0, m: theme.spacing(1), color: "#fff" }}
          >
            <Typography
              gutterBottom
              variant="h6"
              sx={{ mb: 0, lineHeight: "normal" }}
            >
              {name}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: 10 }}>
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

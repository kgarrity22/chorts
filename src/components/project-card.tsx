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
}: {
  name: string;
  url: string;
  img: string;
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
          // border: "1px solid rgba(255, 255, 255, 0.3)",
          transition: "0.2s",
          "&:hover": {
            transform: "scale(1.1)",
            ".MuiCardContent-root": {
              height: 120,
              bottom: 0,
              right: 0,
              left: 0,
              transition: "0.5s height",
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
          image={`/src/assets/charts-imgs/${img || "costco-hotdog.png"}`}
          alt={`${name}-viz`} // project name
          sx={{
            height: 300,
            objectFit: "cover",
            position: "absolute",
          }}
        />
        <CardContent
          sx={{
            background: "rgba(255, 255, 255, 0.2)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            height: 0,
            padding: 0,
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
            "&:last-child": {
              paddingBottom: 0,
            },
          }}
        >
          <Box className="text" sx={{ opacity: 0, m: theme.spacing(1) }}>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {url}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

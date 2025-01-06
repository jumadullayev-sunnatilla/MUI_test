import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Modal,
  Skeleton,
  Typography,
} from "@mui/material";
import { useSpring, animated } from "@react-spring/web";
import { Products } from "../types"; // Import your Products type

// Fade component
interface FadeProps {
  children: React.ReactElement<any>;
  in?: boolean;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing: boolean) => void;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
  props,
  ref
) {
  const { children, in: open, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) onEnter(null as any, true);
    },
    onRest: () => {
      if (!open && onExited) onExited(null as any, true);
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const ProductCard = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Products[] | null>(null);
  const [openModal, setOpenModal] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://dummyjson.com/recipes")
      .then((res) => setData(res.data.recipes))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);
  const ProductCard: JSX.Element[] | undefined = data?.slice(0, 8).map(
    (item: Products): JSX.Element => (
      <div className="w-[300px]" key={item.id}>
        <Card>
          <CardMedia
            component="img"
            alt={item.name}
            height="140"
            image={item.image}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.name}
            </Typography>
            <Button onClick={() => setOpenModal(item.id)} size="small">
              Instructions
            </Button>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>

        {/* Modal */}
        <Modal
          open={openModal === item.id}
          onClose={() => setOpenModal(null)}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: { TransitionComponent: Fade },
          }}
        >
          <Fade in={openModal === item.id}>
            <Box sx={style}>
              <Typography id="spring-modal-title" variant="h6" component="h2">
                {item.name}
              </Typography>
              {item.instructions.map((instr, idx) => (
                <Typography key={idx} sx={{ mt: 2 }}>
                  {idx + 1}. {instr}
                </Typography>
              ))}
              <Button size="small" onClick={() => setOpenModal(null)}>
                Close
              </Button>
            </Box>
          </Fade>
        </Modal>
      </div>
    )
  );

  // Loading skeletons
  if (loading) {
    return (
      <div className="container mx-auto flex flex-wrap gap-3 justify-between px-10">
        {Array(8)
          .fill(null)
          .map((_, index) => (
            <Card sx={{ width: 300, m: 2 }} key={index}>
              <Skeleton
                sx={{ height: 300, width: 300 }}
                animation="wave"
                variant="rectangular"
              />
              <Skeleton sx={{ height: 20, my: 2 }} animation="wave" />
              <Skeleton sx={{ height: 20 }} animation="wave" />
            </Card>
          ))}
      </div>
    );
  }

  // Render product list
  return (
    <div className="container mx-auto px-10">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="flex justify-between gap-3 flex-wrap">{ProductCard}</div>
    </div>
  );
};

export default ProductCard;

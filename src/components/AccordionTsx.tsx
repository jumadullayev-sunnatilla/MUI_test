import Accordion, {
  AccordionSlots,
  accordionClasses,
} from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails, {
  accordionDetailsClasses,
} from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "@mui/material/Fade";
import { useState } from "react";
const AccordionTsx = () => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };
  return (
    <div className="container  mx-10 p-4">
      <Accordion
        expanded={expanded}
        onChange={handleExpansion}
        slots={{ transition: Fade as AccordionSlots["transition"] }}
        slotProps={{ transition: { timeout: 400 } }}
        sx={[
          expanded
            ? {
                [`& .${accordionClasses.region}`]: {
                  height: "auto",
                },
                [`& .${accordionDetailsClasses.root}`]: {
                  display: "block",
                },
              }
            : {
                [`& .${accordionClasses.region}`]: {
                  height: 0,
                },
                [`& .${accordionDetailsClasses.root}`]: {
                  display: "none",
                },
              },
        ]}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">React Typescript haqida</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            TypeScript - 2012 yilda Microsoft tomonidan taqdim etilgan va
            JavaScript imkoniyatlarini kengaytiruvchi veb-ilovalarni ishlab
            chiqish vositasi sifatida joylashtirilgan dasturlash tili
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">Next JS nima?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Next.js server tomonidan ko'rsatilgan React ilovalarini yaratish
            uchun mashhur JavaScript ramkasidir. Vercel (sobiq Zeit) tomonidan
            ishlab chiqilgan Next.js yuqori unumli va kengaytiriladigan
            veb-ilovalarni yaratishni osonlashtiradigan xususiyatlar va
            vositalar to'plamini taqdim etadi.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <h1>{} </h1>
    </div>
  );
};

export default AccordionTsx;

import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";


type Props = {
    // index: number;
    // total: number;
    // icon?: IconifyProps; // Right icon
    // onNext?: VoidFunction;
    // onPrev?: VoidFunction;
    // sx?: SxProps<Theme>;
};

export default function SearchAttributeAccordion()
{

    

<Accordion slotProps={{ heading: { component: 'h4' } }}>
    <AccordionSummary
        // expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
    >
        Accordion
    </AccordionSummary>
    <AccordionDetails>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
        lacus ex, sit amet blandit leo lobortis eget.
    </AccordionDetails>
</Accordion>
}
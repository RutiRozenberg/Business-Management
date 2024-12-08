import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { TitleProps } from "../../models/props.models/title.props.model";

const TitleTypography: React.FC<TitleProps> = ({ title }) =>{

    const theme = useTheme();

    return (
        <Box
        sx={{
          width: '100%',
          background: `linear-gradient(90deg, ${theme.palette.primary.main} 40%, ${theme.palette.primary.dark} 80%)`,
          paddingTop: '10vh',
          paddingBottom: '10vh',
          display: 'flex',
          justifyContent: 'center',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{
            color: theme.palette.secondary.dark,
            fontSize: '3rem',
            letterSpacing: '0.1em',
            fontWeight: 700,
          }}
        >
          {title}
        </Typography>
      </Box>
    )
}


export default TitleTypography;
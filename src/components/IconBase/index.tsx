import { Box, Tooltip } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";
import { theme } from "../../styles/theme";
import { useState } from "react";

interface IconProps {
  icon: IconType;
  onClick?: () => void;
  label: string;
  isGreen?: boolean;
}

type iconOptions = {
  [key: string]: string;
};

const iconColors: iconOptions = {
  greyDef: theme.colors.grey["150"],
  greyHover: theme.colors.grey["300"],
  greenDef: theme.colors.primaryPalette.primary,
  greenHover: theme.colors.primaryPalette["primary.50"],
};

export const IconBase = ({
  icon: Icon,
  onClick,
  label,
  isGreen = false,
}: IconProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <Tooltip
      bg="white"
      color="gray.800"
      hasArrow
      label={label}
      placement="bottom"
    >
      <Box>
        <Icon
          color={
            !isGreen
              ? isHover
                ? iconColors.greyHover
                : iconColors.greyDef
              : isHover
              ? iconColors.greenHover
              : iconColors.greenDef
          }
          cursor="pointer"
          fontSize="20px"
          onClick={onClick}
          onMouseOut={() => setIsHover(false)}
          onMouseOver={() => setIsHover(true)}
        />
      </Box>
    </Tooltip>
  );
};

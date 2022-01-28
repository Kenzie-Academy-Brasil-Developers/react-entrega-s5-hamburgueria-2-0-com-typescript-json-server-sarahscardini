import { theme } from "../../styles/theme";
import { FieldError } from "react-hook-form";
import {
  FormControl,
  FormErrorMessage,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import {
  useState,
  useCallback,
  useEffect,
  ForwardRefRenderFunction,
  forwardRef,
} from "react";

interface InputProps extends ChakraInputProps {
  name: string;
  error?: FieldError | null;
}

type inputVariationOptions = {
  [key: string]: string;
};

const inputVariation: inputVariationOptions = {
  error: theme.colors.primaryPalette.secondary,
  default: theme.colors.grey["0"],
  focus: theme.colors.grey["600"],
  filled: theme.colors.primaryPalette.primary,
};

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, error = null, ...rest },
  ref
) => {
  const [value, setValue] = useState("");
  const [variation, setVariation] = useState("default");

  useEffect(() => {
    if (error) {
      return setVariation("error");
    }
  }, [error]);

  const handleInputFocus = useCallback(() => {
    if (!error) {
      setVariation("focus");
    }
  }, [error]);

  const handleInputBlur = useCallback(() => {
    if (value.length > 1 && !error) {
      return setVariation("filled");
    }
  }, [error, value]);

  return (
    <FormControl isInvalid={!!error}>
      <ChakraInput
        bg={!value ? theme.colors.grey["0"] : "white"}
        borderColor={inputVariation[variation]}
        boxShadow={`0 0 0 1px ${inputVariation[variation]}`}
        color={theme.colors.grey["600"]}
        fontSize="14px"
        h="60px"
        id={name}
        name={name}
        onBlurCapture={handleInputBlur}
        onChangeCapture={(e) => setValue(e.currentTarget.value)}
        onFocus={handleInputFocus}
        ref={ref}
        variant="outline"
        _focus={{ bg: "white" }}
        _hover={{ bgColor: theme.colors.grey["0"] }}
        _placeholder={{ color: theme.colors.grey["200"] }}
        {...rest}
      />

      {!!error && (
        <FormErrorMessage
          color={theme.colors.feedback["negative"]}
          fontSize="12px"
        >
          {error.message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);

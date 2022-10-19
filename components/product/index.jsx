import { Text, Image, Box, Stack, Heading } from "@chakra-ui/react";

const Product = ({ imageSrc, imageAlt, title, category, price }) => (
  <Stack p={{ base: "0 2rem" }}>
    <Image objectFit="cover" maxH={300} src={imageSrc} alt={imageAlt} />
    <Text color="teal.600" textTransform="uppercase">
      {category}
    </Text>

    <Heading color="teal.300" size="md" textTransform="capitalize">
      {title}
    </Heading>
    <Box>
      {price}
      <Box as="span" color="gray.600" fontSize="sm">
        / unit
      </Box>
    </Box>
  </Stack>
);

export default Product;

import { Clothing, Variation } from "@/api/api";
import {
	Card,
	Heading,
	SimpleGrid,
	Image,
	Text,
	Stack,
	Box,
	Flex,
	Container,
	Separator,
	Link,
	List,
	Center,
	Spinner,
} from "@chakra-ui/react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

interface GiftResultsProps {
	allClothing: Clothing[];
	filters: { colors: string[]; styles: string[] };
	sortOption: "name" | "bells" | "poki";
	sortOrder: "asc" | "desc";
	isLoading: boolean;
}

function GiftResults({
	filters,
	allClothing,
	sortOption,
	sortOrder,
	isLoading,
}: GiftResultsProps) {
	// Check if no filters are selected
	if (filters.styles.length === 0 || filters.colors.length === 0) {
		return (
			<Box textAlign="center" py={8}>
				<Text fontSize="lg" color="gray.400">
					Please select at least one color <strong>and</strong> style
					filter to see gift recommendations.
				</Text>
			</Box>
		);
	}

	// Filter clothing and get matching variations
	const filteredClothing = allClothing
		.map((item) => {
			const hasAllStyles =
				filters.styles.length === 0 ||
				filters.styles.every((filterStyle) =>
					item.styles.includes(filterStyle),
				);

			if (!hasAllStyles) return null;

			const matchingVariations = item.variations.filter(
				(variation) =>
					filters.colors.length === 0 ||
					filters.colors.every((filterColor) =>
						variation.colors.includes(filterColor),
					),
			);

			if (matchingVariations.length === 0) return null;

			return {
				...item,
				matchingVariations,
			};
		})
		.filter((item) => item !== null) as (Clothing & {
		matchingVariations: Variation[];
	})[];

	// --- SORTING ---
	const sortedClothing = [...filteredClothing].sort((a, b) => {
		let aValue: string | number = "";
		let bValue: string | number = "";

		switch (sortOption) {
			case "name":
				aValue = a.name.toLowerCase();
				bValue = b.name.toLowerCase();
				break;
			case "bells":
				aValue = a.buy.find((x) => x.currency === "Bells")?.price ?? 0;
				bValue = b.buy.find((x) => x.currency === "Bells")?.price ?? 0;
				break;
			case "poki":
				aValue = a.buy.find((x) => x.currency === "Poki")?.price ?? 0;
				bValue = b.buy.find((x) => x.currency === "Poki")?.price ?? 0;
				break;
		}

		// Handle string comparison for names
		if (typeof aValue === "string" && typeof bValue === "string") {
			return sortOrder === "asc"
				? aValue.localeCompare(bValue)
				: bValue.localeCompare(aValue);
		}

		// Handle numeric comparison for prices
		if (typeof aValue === "number" && typeof bValue === "number") {
			return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
		}

		return 0;
	});

	if (isLoading) {
		return (
			<Container maxW="container.lg" py={8}>
				<Center>
					<Spinner size="xl" color="purple.600" borderWidth="4px" />
				</Center>
			</Container>
		);
	}

	return (
		<Container>
			<Heading size="lg" my={4}>
				Gift Results ({filteredClothing.length} items)
			</Heading>
			<SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={4}>
				{sortedClothing.flatMap((item) =>
					item.matchingVariations.map((variation) => (
						<Card.Root
							key={`${item.name}-${variation.variation}`}
							height="100%"
							display="flex"
							flexDirection="column"
						>
							<Card.Body
								p={2}
								flex="1"
								display="flex"
								flexDirection="column"
							>
								<Box minHeight="80px">
									<Flex
										alignItems="center"
										height="100%"
										gap={4}
									>
										<Box
											display="flex"
											alignItems="center"
											justifyContent="center"
											boxSize="100px"
											flexShrink={0}
										>
											<Image
												src={variation.image_url}
												alt={`${item.name} - ${variation.variation}`}
												maxH="100px"
												maxW="100px"
												objectFit="contain"
											/>
										</Box>
										<Stack gap={0.5} flex={1}>
											<Heading
												size="md"
												textTransform="capitalize"
											>
												{item.name}
											</Heading>
											<Text>
												<Text
													as="span"
													fontSize="sm"
													color="gray.200"
												>
													Variation:{" "}
												</Text>
												<Text
													as="span"
													fontSize="xs"
													color="gray.300"
												>
													{variation.variation}
												</Text>
											</Text>
											<Text>
												<Text
													as="span"
													fontSize="sm"
													color="gray.200"
												>
													Colors:{" "}
												</Text>
												<Text
													as="span"
													fontSize="xs"
													color="gray.300"
												>
													{variation.colors.join(
														", ",
													)}
												</Text>
											</Text>
											<Text>
												<Text
													as="span"
													fontSize="sm"
													color="gray.200"
												>
													Style(s):{" "}
												</Text>
												<Text
													as="span"
													fontSize="xs"
													color="gray.300"
												>
													{item.styles.join(", ")}
												</Text>
											</Text>
										</Stack>
									</Flex>
								</Box>

								<Separator mt={2} mb={1} />

								<Stack gap={1} flex={1}>
									<Heading size="md" textAlign={"center"}>
										More Info
									</Heading>
									<Text fontSize="sm" color="gray.200">
										Available from:
									</Text>
									<List.Root
										listStylePosition="inside"
										fontSize="xs"
										color="gray.300"
										ms={3}
									>
										{item.availability.map((a, index) => (
											<List.Item
												key={index}
												textTransform="capitalize"
											>
												{a.from === "Able Sisters"
													? `${a.from} (${item.seasonality})`
													: a.from}
											</List.Item>
										))}
									</List.Root>
									{item.buy.length > 0 && (
										<>
											<Text
												as="span"
												fontSize="sm"
												color="gray.200"
											>
												Price:
											</Text>
											<List.Root
												listStylePosition="inside"
												fontSize="xs"
												color="gray.300"
												ms={3}
											>
												{item.buy.map((b, index) => (
													<List.Item key={index}>
														{b.price}{" "}
														{b.currency === "Bells"
															? "Bells"
															: "Poki"}
													</List.Item>
												))}
											</List.Root>
										</>
									)}
								</Stack>
								<Link href={item.url} target="_blank" mt={2}>
									View more on Nookipedia{" "}
									<FaArrowUpRightFromSquare />
								</Link>
							</Card.Body>
						</Card.Root>
					)),
				)}
			</SimpleGrid>
			{filteredClothing.length === 0 && (
				<Text textAlign="center" py={4}>
					No items match your filters.
				</Text>
			)}
		</Container>
	);
}

export default GiftResults;

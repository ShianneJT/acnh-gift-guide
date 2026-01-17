import { useState } from "react";
import { Villager } from "@/api/api";
import {
	Card,
	Image,
	Text,
	Box,
	HStack,
	Badge,
	VStack,
	Heading,
	Stack,
	CheckboxCard,
} from "@chakra-ui/react";

interface VillagerCardProps {
	villager: Villager;
	onFilterChange: (filters: { colors: string[]; styles: string[] }) => void;
}

function VillagerCard({ villager, onFilterChange }: VillagerCardProps) {
	const [selectedColors, setSelectedColors] = useState<string[]>([]);
	const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

	//Get colors and styles directly from the villager's data
	const colorOptions = villager?.nh_details?.fav_colors || [];
	const styleOptions = villager?.nh_details?.fav_styles || [];

	const handleColorChange = (values: string[]) => {
		setSelectedColors(values);
		onFilterChange({ colors: values, styles: selectedStyles });
	};

	const handleStyleChange = (values: string[]) => {
		setSelectedStyles(values);
		onFilterChange({ colors: selectedColors, styles: values });
	};

	return (
		<>
			<Card.Root
				flexDirection="row"
				overflow="hidden"
				p={4}
				width="400px"
			>
				<Box>
					<Image
						objectFit="cover"
						maxW="100px"
						alt={villager.name}
						src={villager.image_url}
					/>
					<Text textAlign={"center"} textStyle={"xs"} pt={2}>
						{villager.phrase}
					</Text>
				</Box>
				<Box flex="1">
					<Card.Body width="100%">
						<Card.Title>{villager.name}</Card.Title>
						<Card.Description>{villager.quote}</Card.Description>
						<VStack gapY={3} pt={4} align={"start"} width="100%">
							<Text textStyle={"sm"}>
								Birthday: {villager.birthday_month}{" "}
								{villager.birthday_day}
							</Text>
							<HStack width="100%" flexWrap="wrap">
								<Text textStyle={"sm"}>Favorite Colors:</Text>
								{villager.nh_details.fav_colors.map((color) => (
									<Badge key={color} variant={"subtle"}>
										{color}
									</Badge>
								))}
							</HStack>
							<HStack width="100%" flexWrap="wrap">
								<Text textStyle={"sm"}>Favorite Styles:</Text>
								{villager.nh_details.fav_styles.map((style) => (
									<Badge key={style} variant={"subtle"}>
										{style}
									</Badge>
								))}
							</HStack>
						</VStack>
					</Card.Body>
				</Box>
			</Card.Root>

			{/* <Box>
				<Heading size="md" mb={3} textAlign="center">
					Filters
				</Heading>
				<Stack
					direction="row"
					gap={2}
					flexWrap="wrap"
					justifyContent="center"
				>
					{colorOptions.map((color) => (
						<CheckboxCard.Root
							key={color}
							value={color}
							size="sm"
							width="100px"
							checked={selectedColors.includes(color)}
							onChange={() => {
								const newColors = selectedColors.includes(color)
									? selectedColors.filter((c) => c !== color)
									: [...selectedColors, color];
								handleColorChange(newColors);
							}}
						>
							<CheckboxCard.HiddenInput />
							<CheckboxCard.Control>
								<CheckboxCard.Label
									css={{
										display: "flex",
										justifyContent: "center",
										width: "100%",
										textAlign: "center",
									}}
								>
									{color}
								</CheckboxCard.Label>
							</CheckboxCard.Control>
						</CheckboxCard.Root>
					))}
					{styleOptions.map((style) => (
						<CheckboxCard.Root
							key={style}
							value={style}
							size="sm"
							width="100px"
							checked={selectedStyles.includes(style)}
							onChange={() => {
								const newStyles = selectedStyles.includes(style)
									? selectedStyles.filter((s) => s !== style)
									: [...selectedStyles, style];
								handleStyleChange(newStyles);
							}}
						>
							<CheckboxCard.HiddenInput />
							<CheckboxCard.Control>
								<CheckboxCard.Label
									css={{
										display: "flex",
										justifyContent: "center",
										width: "100%",
										textAlign: "center",
									}}
								>
									{style}
								</CheckboxCard.Label>
							</CheckboxCard.Control>
						</CheckboxCard.Root>
					))}
				</Stack>
			</Box> */}
		</>
	);
}

export default VillagerCard;

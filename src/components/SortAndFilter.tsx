import { useState } from "react";
import {
	Box,
	Heading,
	Stack,
	CheckboxCard,
	IconButton,
	Flex,
	SelectRoot,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValueText,
	createListCollection,
	Spinner,
} from "@chakra-ui/react";
import { Villager } from "@/api/api";
import { LuArrowDown } from "react-icons/lu";

interface SortAndFilterProps {
	villager: Villager;
	onFilterChange: (filters: { colors: string[]; styles: string[] }) => void;
	sortOption: "name" | "bells" | "poki";
	sortOrder: "asc" | "desc";
	onSortChange: (option: "name" | "bells" | "poki") => void;
	onSortOrderChange: (order: "asc" | "desc") => void;
	isLoading?: boolean;
}

function SortAndFilter({
	villager,
	onFilterChange,
	sortOption,
	sortOrder,
	onSortChange,
	onSortOrderChange,
	isLoading = false,
}: SortAndFilterProps) {
	const [selectedColors, setSelectedColors] = useState<string[]>([]);
	const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
	const colorOptions = villager?.nh_details?.fav_colors || [];
	const styleOptions = villager?.nh_details?.fav_styles || [];
	const sortOptions = createListCollection({
		items: [
			{ label: "Name", value: "name" },
			{ label: "Bells", value: "bells" },
			{ label: "Poki", value: "poki" },
		],
	});

	const handleColorChange = (values: string[]) => {
		setSelectedColors(values);
		if (values.length > 0 && selectedStyles.length > 0) {
			onFilterChange({ colors: values, styles: selectedStyles });
		}
	};

	const handleStyleChange = (values: string[]) => {
		setSelectedStyles(values);
		if (selectedColors.length > 0 && values.length > 0) {
			onFilterChange({ colors: selectedColors, styles: values });
		}
	};

	const toggleSortOrder = () => {
		onSortOrderChange(sortOrder === "asc" ? "desc" : "asc");
	};

	return (
		<Box position="relative">
			{isLoading && (
				<Box
					position="absolute"
					top={0}
					left={0}
					right={0}
					bottom={0}
					bg="gray.700"
					opacity={0.5}
					display="flex"
					alignItems="center"
					justifyContent="center"
					zIndex={20}
					borderRadius="md"
				>
					<Spinner size="xl" color="purple.600" borderWidth="4px" />
				</Box>
			)}

			<Heading size="md" mb={3} textAlign="center">
				Sort and Filter
			</Heading>

			{/* Sorting */}
			<Flex gap={2} alignItems="center" justifyContent="center" mb={3}>
				<Box position="relative" width="200px">
					<SelectRoot
						collection={sortOptions}
						width="full"
						value={[sortOption]}
						onValueChange={(e) =>
							onSortChange(
								e.value[0] as "name" | "bells" | "poki"
							)
						}
						disabled={isLoading}
					>
						<SelectTrigger>
							<SelectValueText placeholder="Sort by" />
						</SelectTrigger>
						<SelectContent
							position="absolute"
							zIndex={10}
							width="full"
						>
							{sortOptions.items.map((item) => (
								<SelectItem key={item.value} item={item}>
									{item.label}
								</SelectItem>
							))}
						</SelectContent>
					</SelectRoot>
				</Box>

				<IconButton
					size="sm"
					onClick={toggleSortOrder}
					variant={sortOrder === "asc" ? "outline" : "solid"}
				>
					<LuArrowDown
						style={{
							transform:
								sortOrder === "desc"
									? "rotate(180deg)"
									: "none",
							transition: "transform 0.2s",
						}}
					/>
				</IconButton>
			</Flex>

			{/* Filters */}
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
		</Box>
	);
}

export default SortAndFilter;

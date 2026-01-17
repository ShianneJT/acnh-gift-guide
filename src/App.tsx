import { useState, useEffect } from "react";
import { Clothing, getAllVillagers, Villager, getAllClothing } from "./api/api";
import {
	Box,
	Heading,
	Text,
	VStack,
	Container,
	Stack,
	Skeleton,
	Center,
} from "@chakra-ui/react";
import VillagerComboBox from "./components/VillagerComboBox";
import VillagerCard from "./components/VillagerCard";
import GiftResults from "./components/GiftResults";
import SortAndFilter from "./components/SortAndFilter";

function App() {
	const [allVillagers, setAllVillagers] = useState<Villager[]>([]);
	const [villager, setVillager] = useState<Villager>();
	const [allClothing, setAllClothing] = useState<Clothing[]>([]);
	// const [allFurniture, setAllFurniture] = useState<Clothing[]>([]);
	const [filters, setFilters] = useState<{
		colors: string[];
		styles: string[];
	}>({
		colors: [],
		styles: [],
	});
	const [sortOption, setSortOption] = useState<"name" | "bells" | "poki">(
		"name"
	);
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
	const [loading, setLoading] = useState<boolean>(true);
	const [isFilterLoading, setIsFilterLoading] = useState(false);

	useEffect(() => {
		const loadData = async () => {
			try {
				// Run both API calls in parallel
				const [villagersResult, clothingResult] = await Promise.all([
					getAllVillagers(),
					getAllClothing(),
				]);

				// Filter out villagers without nh_details or ids
				const villagersWithNHDetails = villagersResult.filter(
					(villager: Villager) =>
						villager.nh_details != null && villager.id != ""
				);

				const clothingResultFiltered = clothingResult.filter(
					(clothing: Clothing) =>
						clothing.vill_equip && clothing.category !== "Umbrellas"
				);

				console.log(clothingResultFiltered);

				setAllVillagers(villagersWithNHDetails);
				setAllClothing(clothingResultFiltered);
				setLoading(false);
			} catch (err) {
				console.log("Error: ", err);
				setLoading(false);
			}
		};
		loadData();
	}, []);

	const handleVillagerChange = (villager: Villager) => {
		setVillager(villager);
		setFilters({ colors: [], styles: [] });
	};

	const handleFilterChange = (newFilters: {
		colors: string[];
		styles: string[];
	}) => {
		setIsFilterLoading(true);
		setFilters(newFilters);
		setTimeout(() => setIsFilterLoading(false), 100);
	};

	const handleSortChange = (option: "name" | "bells" | "poki") => {
		setIsFilterLoading(true);
		setSortOption(option);
		setTimeout(() => setIsFilterLoading(false), 100);
	};

	const handleSortOrderChange = (order: "asc" | "desc") => {
		setIsFilterLoading(true);
		setSortOrder(order);
		setTimeout(() => setIsFilterLoading(false), 100);
	};

	return (
		<Box minH="100vh">
			<Container maxW="container.lg" p={8} pb={10} textAlign="center">
				<Heading
					as="h1"
					fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
					mb={3}
					color="gray.300"
				>
					Animal Crossing: New Horizons Gift Guide
				</Heading>
				<Text fontSize={{ base: "md", sm: "lg" }} color="gray.400">
					Find the perfect gift for your villager!
				</Text>
			</Container>

			<Container maxW="container.lg">
				<Center>
					<VStack gap={4}>
						{!loading ? (
							<VillagerComboBox
								villagers={allVillagers}
								handleVillagerChange={handleVillagerChange}
							/>
						) : (
							<Stack width="200px">
								<Skeleton height="40px" />
							</Stack>
						)}

						{villager && (
							<>
								<VillagerCard
									key={villager.id}
									villager={villager}
								/>
								<SortAndFilter
									onFilterChange={handleFilterChange}
									sortOption={sortOption}
									sortOrder={sortOrder}
									onSortChange={handleSortChange}
									onSortOrderChange={handleSortOrderChange}
									villager={villager}
									isLoading={isFilterLoading}
								/>
							</>
						)}
					</VStack>
				</Center>
			</Container>
			{villager && (
				<>
					<GiftResults
						filters={filters}
						allClothing={allClothing}
						sortOption={sortOption}
						sortOrder={sortOrder}
						isLoading={isFilterLoading}
					/>
				</>
			)}
			{/* Footer */}
			{/* <Box bg="white" borderTop="1px" borderColor="gray.200" mt={12}>
				<Container maxW="container.lg" py={6}>
					<Text textAlign="center" fontSize="sm" color="gray.600">
						© 2026 My App. All rights reserved.
					</Text>
				</Container>
			</Box> */}
		</Box>
	);
}

export default App;

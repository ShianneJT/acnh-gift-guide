import { useState, useEffect } from "react";
import {
	Clothing,
	getAllVillagers,
	Villager,
	getAllClothing,
	ACNHEvent,
	getTodaysEvents,
} from "./api/api";
import {
	Box,
	Heading,
	Text,
	VStack,
	Container,
	Stack,
	Skeleton,
	Link,
} from "@chakra-ui/react";
import VillagerComboBox from "./components/VillagerComboBox";
import VillagerCard from "./components/VillagerCard";
import GiftResults from "./components/GiftResults";
import SortAndFilter from "./components/SortAndFilter";
import TodaysEvents from "./components/TodaysEvents";

function App() {
	const [allVillagers, setAllVillagers] = useState<Villager[]>([]);
	const [villager, setVillager] = useState<Villager | null>();
	const [allClothing, setAllClothing] = useState<Clothing[]>([]);
	const [otherEvents, setOtherEvents] = useState<ACNHEvent[]>([]);
	const [birthdayEvents, setBirthdayEvents] = useState<ACNHEvent[]>([]);
	const [filters, setFilters] = useState<{
		colors: string[];
		styles: string[];
	}>({
		colors: [],
		styles: [],
	});
	const [sortOption, setSortOption] = useState<"name" | "bells" | "poki">(
		"name",
	);
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
	const [loading, setLoading] = useState<boolean>(true);
	const [isFilterLoading, setIsFilterLoading] = useState(false);

	useEffect(() => {
		const loadData = async () => {
			try {
				// ----- Villagers -----
				const villagersResult = await getAllVillagers();

				// Filter out villagers without nh_details or ids
				const villagersWithNHDetails = villagersResult.filter(
					(villager: Villager) =>
						villager.nh_details != null && villager.id != "",
				);

				setAllVillagers(villagersWithNHDetails);

				// ----- Events -----
				const todaysEventsResult = await getTodaysEvents();
				const birthdayEvents = todaysEventsResult.filter(
					(e) => e.type === "Birthday",
				);
				const otherEvents = todaysEventsResult.filter(
					(e) => e.type !== "Birthday",
				);

				setBirthdayEvents(birthdayEvents);
				setOtherEvents(otherEvents);

				setLoading(false);

				// ----- Clothing -----
				getAllClothing().then((response) => {
					const clothingResultFiltered = response.filter(
						(clothing: Clothing) =>
							clothing.vill_equip &&
							clothing.category !== "Umbrellas",
					);
					setAllClothing(clothingResultFiltered);
				});
			} catch (err) {
				console.log("Error: ", err);
				setLoading(false);
			}
		};
		loadData();
	}, []);

	const handleVillagerChange = (villager: Villager | null) => {
		setVillager(villager);
		resetFilters();
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

	const openVillagerCard = (id: string) => {
		const villager = allVillagers.find((x) => x.id === id);

		if (!villager) return;

		handleVillagerChange(villager);
	};

	const resetFilters = () => {
		setFilters({ colors: [], styles: [] });
		setSortOption("name");
		setSortOrder("asc");
	};

	return (
		<Box minH="100vh" display="flex" flexDirection="column">
			<Box flex="1">
				<Container p={8} pb={10} textAlign="center">
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
					<VStack gap={4} width="100%">
						{!loading ? (
							<>
								<TodaysEvents
									birthdayEvents={birthdayEvents}
									otherEvents={otherEvents}
									allVillagers={allVillagers}
									openVillagerCard={openVillagerCard}
								/>
								<VillagerComboBox
									villagers={allVillagers}
									handleVillagerChange={handleVillagerChange}
								/>
							</>
						) : (
							<>
								<Stack width="100%" maxW="400px">
									<Skeleton height="100px" />
								</Stack>
								<Stack width="200px">
									<Skeleton height="40px" />
								</Stack>
							</>
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
									filters={filters}
								/>
							</>
						)}
					</VStack>
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
			</Box>
			<Box
				as="footer"
				textAlign="center"
				py={4}
				fontSize="sm"
				color="gray.500"
			>
				Built by Shianne Taylor © 2026 • Data from Nookipedia API •{" "}
				<Link href="https://github.com/ShianneJT" target="_blank">
					GitHub
				</Link>
			</Box>
		</Box>
	);
}

export default App;

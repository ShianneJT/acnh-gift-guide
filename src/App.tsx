import { useState, useEffect } from "react";
import { getAllVillagers, Villager } from "./api/api";
import "./App.css";
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

function App() {
	const [allVillagers, setAllVillagers] = useState<Villager[]>([]);
	const [villager, setVillager] = useState<Villager>();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const loadData = async () => {
			try {
				const result = await getAllVillagers();

				// Filter out villagers without nh_details or ids
				const villagersWithNHDetails = result.filter(
					(villager: Villager) =>
						villager.nh_details != null && villager.id != ""
				);

				setAllVillagers(villagersWithNHDetails);
				setLoading(false);
			} catch (err) {
				console.log("Error: ", err);
			}
		};

		loadData();
	}, []);

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
								setVillager={setVillager}
							/>
						) : (
							<Stack width="200px">
								<Skeleton height="40px" />
							</Stack>
						)}

						{villager && (
							<VillagerCard
								key={villager.id}
								villager={villager}
							/>
						)}
					</VStack>
				</Center>
			</Container>

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

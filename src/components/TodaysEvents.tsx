import { ACNHEvent, Villager } from "@/api/api";
import { Card, Image, Text, Box, Heading, Link } from "@chakra-ui/react";

interface TodaysEventsProps {
	otherEvents: ACNHEvent[];
	allVillagers: Villager[];
	openVillagerCard: (id: string) => void;
	birthdayEvents: ACNHEvent[];
}

function TodaysEvents({
	otherEvents,
	allVillagers,
	openVillagerCard,
	birthdayEvents,
}: TodaysEventsProps) {
	const getVillager = (eventUrl: string) => {
		return allVillagers.find((v) => v.url === eventUrl);
	};

	return (
		<Card.Root maxW="400px" width="100%" size="sm" mb={4}>
			<Card.Body>
				<Card.Title fontSize="xl" textAlign="center">
					🎉 Today's Events! 🎉
				</Card.Title>

				{/* Birthdays */}
				{birthdayEvents.length > 0 && (
					<Box mt={4}>
						<Heading size="lg" color="gray.200" mb={3}>
							Birthdays
						</Heading>

						<Box display="flex" flexWrap="wrap" gap={3}>
							{birthdayEvents.map((b, i) => {
								const villager = getVillager(b.url);
								if (!villager) return null;

								return (
									<Box
										key={i}
										as="button"
										onClick={() =>
											openVillagerCard(villager.id)
										}
										display="flex"
										flexDirection="column"
										alignItems="center"
										justifyContent="center"
										bg="purple.900"
										_hover={{ bg: "purple.800" }}
										borderRadius="full"
										p={3}
										width="80px"
										transition="all 0.2s"
										boxShadow="sm"
										cursor="pointer"
									>
										<Box
											boxSize="50px"
											borderRadius="full"
											overflow="hidden"
											mb={1}
											display="flex"
											alignItems="center"
											justifyContent="center"
										>
											<Image
												src={
													villager.nh_details.icon_url
												}
												alt={villager.name}
												boxSize="100%"
												objectFit="cover"
												objectPosition="center"
											/>
										</Box>
										<Text fontSize="xs" textAlign="center">
											{villager.name}
										</Text>
									</Box>
								);
							})}
						</Box>
					</Box>
				)}

				{/* Other Events */}
				{otherEvents.length > 0 && (
					<Box mt={4}>
						<Heading size="lg" color="gray.200" mb={1}>
							Events
						</Heading>
						{otherEvents.map((e, i) => (
							<Link href={e.url} target="_blank" key={i} ms={2}>
								{e.event}
							</Link>
						))}
					</Box>
				)}
			</Card.Body>
		</Card.Root>
	);
}

export default TodaysEvents;

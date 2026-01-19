import { Villager } from "@/api/api";
import {
	Card,
	Image,
	Text,
	Box,
	HStack,
	Badge,
	VStack,
} from "@chakra-ui/react";

interface VillagerCardProps {
	villager: Villager;
}

function VillagerCard({ villager }: VillagerCardProps) {
	return (
		<Card.Root overflow="hidden" maxW="400px" width="100%" size="sm">
			<Card.Body flexDirection={{ base: "column", sm: "row" }}>
				<Box margin="auto">
					<Image
						objectFit="cover"
						maxW="100px"
						alt={villager.name}
						src={villager.image_url}
					/>
					<Text textAlign="center" textStyle="xs" pt={2}>
						{villager.phrase}
					</Text>
				</Box>
				<Box flex="1">
					<Card.Body width="100%">
						<Card.Title>{villager.name}</Card.Title>
						<Card.Description>{villager.quote}</Card.Description>
						<VStack gapY={3} pt={4} align="start" width="100%">
							<Text>
								<Text as="span" fontSize="sm" color="gray.200">
									Birthday:{" "}
								</Text>
								<Text as="span" fontSize="xs" color="gray.300">
									{villager.birthday_month}{" "}
									{villager.birthday_day}
								</Text>
							</Text>
							<HStack width="100%" flexWrap="wrap">
								<Text textStyle="sm" color="gray.200">
									Favorite Colors:
								</Text>
								{villager.nh_details.fav_colors.map((color) => (
									<Badge key={color} variant="subtle">
										{color}
									</Badge>
								))}
							</HStack>
							<HStack width="100%" flexWrap="wrap">
								<Text textStyle="sm" color="gray.200">
									Favorite Styles:
								</Text>
								{villager.nh_details.fav_styles.map((style) => (
									<Badge key={style} variant="subtle">
										{style}
									</Badge>
								))}
							</HStack>
						</VStack>
					</Card.Body>
				</Box>
			</Card.Body>
		</Card.Root>
	);
}

export default VillagerCard;

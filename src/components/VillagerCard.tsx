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
		<Card.Root flexDirection="row" overflow="hidden" maxW="xl" p={4}>
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
			<Box>
				<Card.Body>
					<Card.Title>{villager.name}</Card.Title>
					<Card.Description>{villager.quote}</Card.Description>
					<VStack gapY={3} pt={4} align={"start"}>
						<Text textStyle={"sm"}>
							{`Birthday: ${villager.birthday_month} ${villager.birthday_day}`}
						</Text>
						<HStack>
							<Text textStyle={"sm"}>Favorite Colors:</Text>
							{villager.nh_details.fav_colors.map((color) => (
								<Badge variant={"subtle"}>{color}</Badge>
							))}
						</HStack>
						<HStack>
							<Text textStyle={"sm"}>Favorite Styles:</Text>
							{villager.nh_details.fav_styles.map((style) => (
								<Badge variant={"subtle"}>{style}</Badge>
							))}
						</HStack>
					</VStack>
				</Card.Body>
			</Box>
		</Card.Root>
	);
}

export default VillagerCard;

import { Villager } from "@/api/api";
import {
	Combobox,
	Portal,
	useFilter,
	useListCollection,
	HStack,
	Image,
} from "@chakra-ui/react";

interface VillagerComboBoxProps {
	villagers: Villager[];
	handleVillagerChange: (villager: Villager) => void;
}

function VillagerComboBox({
	villagers,
	handleVillagerChange,
}: VillagerComboBoxProps) {
	const { contains } = useFilter({ sensitivity: "base" });

	const villagerItems = villagers.map((v) => ({
		label: v.name,
		value: v.id,
		villager: v,
	}));

	const { collection, filter } = useListCollection({
		initialItems: villagerItems,
		filter: contains,
	});

	const handleValueChange = (details: { value: string[] }) => {
		const selectedItem = collection.items.find(
			(item) => item.value === details.value[0]
		);
		const villager = selectedItem ? selectedItem.villager : null;
		if (!villager) return;

		handleVillagerChange(villager);
	};

	return (
		<Combobox.Root
			collection={collection}
			onInputValueChange={(e) => filter(e.inputValue)}
			onValueChange={handleValueChange}
			width="200px"
			multiple={false}
		>
			<Combobox.Control>
				<Combobox.Input placeholder="Enter a Villager Name" />
				<Combobox.IndicatorGroup>
					<Combobox.ClearTrigger />
					<Combobox.Trigger />
				</Combobox.IndicatorGroup>
			</Combobox.Control>
			<Portal>
				<Combobox.Positioner>
					<Combobox.Content>
						<Combobox.Empty>No villagers found</Combobox.Empty>
						{collection.items.map((item) => (
							<Combobox.Item item={item} key={item.value}>
								<HStack>
									<Image
										src={item.villager.nh_details.icon_url}
										alt={item.villager.name}
										boxSize="40px"
										objectFit="cover"
										borderRadius="md"
									/>
									<span>{item.label}</span>
								</HStack>
								<Combobox.ItemIndicator />
							</Combobox.Item>
						))}
					</Combobox.Content>
				</Combobox.Positioner>
			</Portal>
		</Combobox.Root>
	);
}

export default VillagerComboBox;

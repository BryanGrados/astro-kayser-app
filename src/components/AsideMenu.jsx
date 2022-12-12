import { Burger, Modal, Text } from "@mantine/core";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ToggleTheme from "./theme/ToggleTheme";

export default function AsideMenu() {
	const [opened, setOpened] = useState(false);

	return (
		<div className="h-full w-16 py-5 bg-[#3b49e7] dark:bg-[#0d0e0f] flex flex-col items-center justify-between">
			<Modal
				centered
				opened={opened}
				onClose={() => setOpened(false)}
				transition="fade"
				transitionDuration={300}
				transitionTimingFunction="ease"
				overlayBlur={3}
				overlayOpacity={0.5}
				title="Menu - KAYSER"
			>
				<AnimatePresence>
					<motion.div
						initial={{ x: 200, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						exit={{ x: 100, opacity: 0 }}
						transition={{ duration: 0.5 }}
					>
						<Text>Menu</Text>
					</motion.div>
				</AnimatePresence>
			</Modal>
			<motion.div
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				onClick={() => setOpened((o) => !o)}
			>
				<Burger
					opened={opened}
					color="#fff"
					className="bg-[#3542D0] dark:bg-[#1a1b1e]"
				/>
			</motion.div>
			<ToggleTheme />
		</div>
	);
}

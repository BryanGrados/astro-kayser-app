import { Text } from "@mantine/core";
import { motion } from "framer-motion";
import { Notification } from "iconsax-react";

export default function MainHeader() {
	return (
		<header className="w-full h-20 border-b border-gray-300 dark:border-zinc-700 bg-white dark:bg-[#151618]">
			<nav className="container flex items-center justify-between h-full">
				<Text className="text-2xl font-semibold">Dashboard</Text>
				<div>
					<motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
						<motion.div
							initial={{ rotate: 0 }}
							whileHover={{
								rotate: [0, 10, -10, 10, -10, 0],
								transition: { duration: 0.5, ease: "easeInOut" },
							}}
						>
							<Notification />
						</motion.div>
					</motion.button>
				</div>
			</nav>
		</header>
	);
}

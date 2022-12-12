import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { Moon, Sun1 } from "iconsax-react";
import { motion } from "framer-motion";
import { useState } from "react";

const variants = {
	dark: {
		rotate: 180,
		transition: {
			duration: 0.5,
			ease: "easeInOut",
		},
	},
	light: {
		rotate: 0,
		transition: {
			duration: 0.5,
			ease: "easeInOut",
		},
	},
};
export default function ToggleTheme() {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const dark = colorScheme === "dark";

	return (
		<motion.button
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
			onClick={() => toggleColorScheme()}
			className="bg-[#3542D0] dark:bg-[#1a1b1e] p-1 rounded-md"
		>
			<motion.div
				variants={variants}
				initial={false}
				animate={dark ? "dark" : "light"}
			>
				{dark ? <Sun1 color="#fff" /> : <Moon color="#fff" />}
			</motion.div>
		</motion.button>
	);
}

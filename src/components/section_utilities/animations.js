export const parent = {
	hidden: {
		x: "100vh",
		opacity: 0,
	},
	visible: {
		x: 0,
		opacity: 1,
		transition: {
			duration: 2,
			ease: "easeInOut",
			delayChildren: 2,
			staggerChildren: 0.3,
		},
	},
};

export const childrens = {
	hidden: {
		x: "100vw",
	},
	visible: {
		x: 0,
		transition: {
			delayChildren: 0.1,
			type: "spring",
			stiffness: 100,
			mass: 0.3,
		},
	},
};

export const subChildrens = {
	hidden: {
		y: "-100vw",
		opacity: 0,
	},
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			type: "spring",
			stiffness: 100,
			mass: 0.3,
		},
	},
};

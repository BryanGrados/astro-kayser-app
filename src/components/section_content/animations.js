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
			staggerChildren: 0.5,
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
			type: "spring",
			stiffness: 100,
			mass: 0.3,
		},
	},
};

export const subChildrens = {
	hidden: {
		height: 0,
		width: 0,
		opacity: 0,
	},
	visible: {
		height: "auto",
		width: "auto",
		opacity: 1,
		transition: {
			type: "spring",
			stiffness: 100,
			mass: 0.3,
		},
	},
};

export const tableAnimation = {
	hidden: {
		clipPath: "inset(10% 50% 90% 50% round 10px)",
		transition: {
			type: "spring",
			bounce: 0,
			duration: 0.3,
		},
	},
	visible: {
		clipPath: "inset(0% 0% 0% 0% round 10px)",
		transition: {
			type: "spring",
			bounce: 0,
			duration: 0.7,
			delayChildren: 0.3,
			staggerChildren: 0.05,
		},
	},
};

export const rowAnimation = {
	hidden: { opacity: 0, x: 20, transition: { duration: 0.2 } },
	visible: {
		opacity: 1,
		x: 0,
		transition: { type: "spring", stiffness: 300, damping: 24 },
	},
};

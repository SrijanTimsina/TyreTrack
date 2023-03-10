const trackingCover = document.getElementById("tracking-cover");
const toggleButton =
	document.getElementsByClassName("toggle-button")[0];
const navbarLinks =
	document.getElementsByClassName("navbar-links")[0];
const navbar = document.getElementById("navbar");
const tracking = document.getElementById("tracking");
const marca = document.getElementById("marca");
const model = document.getElementById("model");
const variante = document.getElementById("variante");
const codice = document.getElementById("codice");
const larghezza = document.getElementById("larghezza");
const serie = document.getElementById("serie");
const diametro = document.getElementById("diametro");
const catVel = document.getElementById("cat-vel");
const tokenId = new URL(window.location.href).hash.slice(1);
toggleButton.addEventListener("click", () => {
	navbarLinks.classList.toggle("active");
	toggleButton.classList.toggle("active");
	navbar.classList.toggle("active");
});

const web3 = new Web3(
	"https://goerli.infura.io/v3/14c80351c1a84ca985d997a0d7ec0553"
);

const contractAddress = "0x0BeB9D7CC3d7568954E450Fc13195A4224bE5bee";
let contractAbi = [
	{ inputs: [], stateMutability: "nonpayable", type: "constructor" },
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "approved",
				type: "address",
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
		],
		name: "Approval",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "operator",
				type: "address",
			},
			{
				indexed: false,
				internalType: "bool",
				name: "approved",
				type: "bool",
			},
		],
		name: "ApprovalForAll",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "OwnershipTransferred",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address",
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
		],
		name: "Transfer",
		type: "event",
	},
	{
		inputs: [
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "tokenId", type: "uint256" },
		],
		name: "approve",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "owner", type: "address" },
		],
		name: "balanceOf",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "uint256", name: "tokenId", type: "uint256" },
		],
		name: "getApproved",
		outputs: [{ internalType: "address", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "owner", type: "address" },
			{ internalType: "address", name: "operator", type: "address" },
		],
		name: "isApprovedForAll",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "recipient", type: "address" },
			{ internalType: "string", name: "tokenURI", type: "string" },
		],
		name: "mintNFT",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "name",
		outputs: [{ internalType: "string", name: "", type: "string" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "owner",
		outputs: [{ internalType: "address", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "uint256", name: "tokenId", type: "uint256" },
		],
		name: "ownerOf",
		outputs: [{ internalType: "address", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "renounceOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "from", type: "address" },
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "tokenId", type: "uint256" },
		],
		name: "safeTransferFrom",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "from", type: "address" },
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "tokenId", type: "uint256" },
			{ internalType: "bytes", name: "data", type: "bytes" },
		],
		name: "safeTransferFrom",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "operator", type: "address" },
			{ internalType: "bool", name: "approved", type: "bool" },
		],
		name: "setApprovalForAll",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "bytes4", name: "interfaceId", type: "bytes4" },
		],
		name: "supportsInterface",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "symbol",
		outputs: [{ internalType: "string", name: "", type: "string" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "uint256", name: "tokenId", type: "uint256" },
		],
		name: "tokenURI",
		outputs: [{ internalType: "string", name: "", type: "string" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "from", type: "address" },
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "tokenId", type: "uint256" },
		],
		name: "transferFrom",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "newOwner", type: "address" },
		],
		name: "transferOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
];

async function name() {
	const contract = new web3.eth.Contract(
		contractAbi,
		contractAddress
	);

	const tokenURI = await contract.methods.tokenURI(tokenId).call();

	fetch(tokenURI)
		.then((response) => response.json())
		.then((data) => {
			marca.innerHTML = data.marca;
			model.innerHTML = data.modello;
			variante.innerHTML = data.struttura;
			codice.innerHTML = data.codice;
			larghezza.innerHTML = data.larghezza;
			serie.innerHTML = data.serie;
			diametro.innerHTML = data.diametro;
			catVel.innerHTML = data.categoria_velocita;
		});

	contract
		.getPastEvents("Transfer", {
			filter: {
				tokenId: tokenId,
			},
			fromBlock: 0,
			toBlock: "latest",
		})
		.then((events) => {
			if (events.length < 2) {
				tracking.classList.add("one");
			}
			const trackingElements = events.map((el) => {
				let div = document.createElement("div");
				div.innerHTML = `<a href="https://goerli.etherscan.io/tx/${el.transactionHash}" target="blank"><div class="tracking-line"></div><div class="circle"></div><p>${el.event}</p></a>`;
				return div;
			});
			tracking.append(...trackingElements);
			trackingCover.classList.add("loading");
		});
}

name();

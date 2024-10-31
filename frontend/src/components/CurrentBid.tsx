import { Card } from "flowbite-react";

export function CurrentBid() {
    return (
        <Card className="max-w-sm">
            <div className="">
                <p className="text-xl font-bold leading-none text-center text-gray-900 dark:text-white">
                    Current Bid:
                </p>
                <p className="text-2xl text-center">
                    $500 USD
                </p>

                <p className="text-xs text-center pt-2 pb-2 text-gray-500">
                    Number of active bidders: 54
                </p>
            </div>
            <div className="flex items-center justify-between">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Latest Bidders</h5>
                {/*<a href="#" className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                    View all
                </a>

                -- Might use later --

                */}
            </div>
            <div className="flow-root">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="shrink-0">
                                <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="bidder"/>
                            </div>
                            <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Neil Sims</p>
                                <p className="truncate text-sm text-gray-500 dark:text-gray-400">email@business.com</p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$500</div>
                        </div>
                    </li>
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="shrink-0">
                                <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="bidder"/>
                            </div>
                            <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Bonnie Green</p>
                                <p className="truncate text-sm text-gray-500 dark:text-gray-400">email@business.com</p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$450</div>
                        </div>
                    </li>
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="shrink-0">
                                <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="bidder"/>
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Michael Gough</p>
                                <p className="truncate text-sm text-gray-500 dark:text-gray-400">email@business.com</p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$420</div>
                        </div>
                    </li>
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="shrink-0">
                                <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="bidder"/>
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Lana Byrd</p>
                                <p className="truncate text-sm text-gray-500 dark:text-gray-400">email@business.com</p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$400</div>
                        </div>
                    </li>
                    <li className="pb-0 pt-3 sm:pt-4">
                        <div className="flex items-center space-x-4">
                            <div className="shrink-0">
                                <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="bidder"/>
                            </div>
                            <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Thomes Lean</p>
                                <p className="truncate text-sm text-gray-500 dark:text-gray-400">email@business.com</p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"> $350 </div>
                        </div>
                    </li>
                </ul>
            </div>
        </Card>
    );
}

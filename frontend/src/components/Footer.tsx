import {Footer, List} from "flowbite-react";
import {BsFacebook, BsInstagram, BsTwitter, BsHeadset, BsPinFill, BsFillTelephoneFill, BsEnvelopeFill                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             } from "react-icons/bs";

export function FooterBottom() {
    return (
        <Footer className="rounded-none" bgDark>
            <div className="w-full">
                <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
                    <div>
                        <div className="inline-flex gap-3">
                            <Footer.Icon href="#" icon={BsHeadset}/>
                            <Footer.Title title="Åbningstider telefon" />
                        </div>
                        <Footer.LinkGroup col>
                            <List unstyled className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                                <List.Item className="pb-3 sm:pb-4">
                                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                        <div className="min-w-0 max-w-52 flex-1">
                                            <p className="truncate text-sm font-medium text-gray-6000 dark:text-gray-6000">Mandag - Torsdag:</p>
                                        </div>
                                        <div className="inline-flex items-center text-sm font-medium text-gray-6000 dark:text-gray-6000">08:00 - 19:00</div>
                                    </div>
                                </List.Item>
                            </List>
                            <List unstyled className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                                <List.Item className="pb-3 sm:pb-4">
                                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                        <div className="min-w-0 max-w-52 flex-1">
                                            <p className="truncate text-sm font-medium text-gray-6000 dark:text-gray-6000">Fredag:</p>
                                        </div>
                                        <div className="inline-flex items-center text-sm font-medium text-gray-6000 dark:text-gray-6000">08:00 - 15:30</div>
                                    </div>
                                </List.Item>
                            </List>
                            <List unstyled className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                                <List.Item className="pb-3 sm:pb-4">
                                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                        <div className="min-w-0 max-w-52 flex-1">
                                            <p className="truncate text-sm font-medium text-gray-6000 dark:text-gray-6000">Lørdag, søndag, helligdage:</p>
                                        </div>
                                        <div className="inline-flex items-center text-sm font-medium text-gray-6000 dark:text-gray-6000">Lukket</div>
                                    </div>
                                </List.Item>
                            </List>
                        </Footer.LinkGroup>
                        <Footer.Title title="Åbningstider for pick-ups" />
                        <Footer.LinkGroup>
                            <div className="">Se åbningstider og adresser for alle Pick-Up Points i København, Odense og Aarhus, klik her</div>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title="Support" />
                        <Footer.LinkGroup col>
                            <Footer.Link href="#">Guides</Footer.Link>
                            <Footer.Link href="#">Forsendelser og levering</Footer.Link>
                            <Footer.Link href="#">Om Pick-up Points</Footer.Link>
                            <Footer.Link href="#">Defekt vare</Footer.Link>
                            <Footer.Link href="#">Kundeservice</Footer.Link>
                            <Footer.Link href="#">Handelsbetingelser</Footer.Link>
                            <Footer.Link href="#">Persondatapolitik</Footer.Link>
                            <Footer.Link href="#">CSR</Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title="Lær mere" />
                        <Footer.LinkGroup col>
                            <Footer.Link href="#">Om os</Footer.Link>
                            <Footer.Link href="#">Nyhedsrum</Footer.Link>
                            <Footer.Link href="#">Bæredygtighed</Footer.Link>
                            <Footer.Link href="#">Arbejd hos os</Footer.Link>
                            <Footer.Link href="#">Ofte sillede spørgsmål</Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title="Kontakter" />
                        <Footer.LinkGroup col>
                            <div className="inline-flex gap-3">
                                <Footer.Icon href="#" icon={BsPinFill}/>
                                <Footer.Title title="Vestergade 14, 3630 Jægerspris"/>
                            </div>
                            <div className="inline-flex gap-3">
                                <Footer.Icon href="#" icon={BsFillTelephoneFill}/>
                                <Footer.Title title="+45 42 39 96 64"/>
                            </div>
                            <div className="inline-flex gap-3">
                                <Footer.Icon href="#" icon={BsEnvelopeFill}/>
                                <Footer.Title title="dtuauction@fakemail.com"/>
                            </div>
                        </Footer.LinkGroup>
                    </div>
                </div>
                <div className="w-full bg-gray-700 px-4 py-6 sm:flex sm:items-center sm:justify-between">
                    <Footer.Copyright href="#" by="Team04™" year={2024} />
                    <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                        <Footer.Icon href="#" icon={BsFacebook} />
                        <Footer.Icon href="#" icon={BsInstagram} />
                        <Footer.Icon href="#" icon={BsTwitter} />
                    </div>
                </div>
            </div>
        </Footer>
    );
}
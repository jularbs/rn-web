import { open_sans } from "@/app/fonts";
import ContentComponent from "@/components/ContentComponent/ContentComponent";
import FacebookShareComponent from "@/components/FacebookShareComponent";
import { LatestStoriesComponent } from "@/components/LatestStoriesComponent";
import SocialSharingButton from "@/components/SocialSharingButton";
import TwitterShareComponent from "@/components/TwitterShareComponent";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Post() {

    const sampleContent = `<p><p dir="ltr">Palace Press Officer Claire Castro has maintained that she had no involvement in the resignation of Baguio City Mayor Benjamin Magalong as special adviser to the Independent Commission for Infrastructure (ICI), emphasizing that the decision to step down was entirely his own.
        </p><p dir="ltr">During a Palace briefing on Thursday, Castro dismissed Magalong’s claim that he resigned as ICI special adviser following Palace remarks suggesting he had 'no right or authority to conduct and lead an investigation,' saying the matter had already been repeatedly addressed.</p>
        <p dir="ltr">"Una-una po, hindi ko po saklaw ang kanyang damdamin. Siya po ang boluntaryong nag-resign. Hindi naman po siya pinagreresign. Kung iyon po ang kanyang naging desisyon, hindi ko rin po saklaw ang kanyang pagdi-desisyon. Sinabi po niya na wala daw siyang karapatang mag-imbestiga," she said. </p>
        <p dir="ltr">Castro also clarified that Magalong’s supposed authority to conduct investigations was never officially granted by the President.</p>
        <p dir="ltr"><span id="docs-internal-guid-689d6219-7fff-558c-f0c3-6cdbfef5dc69">"</span>Iba po kasi ang pag-presume at iba naman po yung naging pronouncement ng ating Pangulo. September 15, sinabi po ng Pangulo na siya po ay special advisor. Hinanapan po siya sa isang programa kung nasaan po ang kanyang mandato, ang papel patungkol po dito," she explained.</p>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/_K4buDzRS_w?si=iC64QG42fCgBzUse" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <p dir="ltr">"Ang sinabi lamang po ni Mayor Magalong ay he just presumed that he is an investigator. Maaaring ganun ang mangyayari kung siya po ay nag-resign bilang mayor. Pero ang Pangulo na nga rin po nagsabi na pinili niya pong mag-stay at manatiling mayor ng Baguio City," Castro added.</p>
        <p dir="ltr">The Palace official appealed to the public to refrain from engaging in a “guessing game” or creating intrigue about her role in the Palace, especially those that could cast doubt on the President’s decisions.</p>
        <image src="https://picsum.photos/800/400" alt="Sample" width="800" height="400" style="display: block;" />
        <p dir="ltr">"Sana po maiwasan na po rin sana natin yung mga guessing game na nagbibigay ng intriga, lalong-lalo na sa aking naging trabaho. Ang aking naging pronouncement po dito noong September 26 na ang role ni Mayor Magalong ay ibibigay muna sa legal team, yan po ay nanggaling sa Pangulo," Castro said.</p>
        <p dir="ltr">"Huwag po niyang bigyan ng intriga na mayroong nagutos sa akinna ibang tao. Kaya sabi nga natin, iwasan natin ang kwentong walang ebidensya," she added.</p>
        <p dir="ltr">In response, Castro challenged Magalong to prove his allegation that someone allegedly ordered her to issue a statement regarding the mayor’s role in the ICI. </p>
        <p dir="ltr">"Kung sino man yung sinasabi niyang yun, kung may alam siya kung sino nag-utos sa akin at hindi ang pangulo, sa mga sinabi ko nung September 26, ipalitaw niya po. Dahil alam kong wala siyang mapapalitaw. Dahil yun ay walang katotohanan," Castro emphasized. </p>
        <p dir="ltr"><a href="https://dzrh.com.ph/post/ex-pnp-chief-azurin-to-assume-post-as-special-adviser-and-investigator-of-ici-malacanang">Retired Philippine National Police (PNP) Chief General Rodolfo Azurin Jr.</a> replaced Magalong in his post as part of the independent commission investigating alleged anomalies and irregularities in the Department of Public Works and Highways’ (DPWH) flood control projects.</p></p>
        <ul>
            <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
            <li>Aliquam tincidunt mauris eu risus.</li>
            <li>Vestibulum auctor dapibus neque.</li>
        </ul>
        <ol>
            <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
            <li>Aliquam tincidunt mauris eu risus.</li>
            <li>Vestibulum auctor dapibus neque.</li>
        </ol>
        <dl>
        <dt>Definition list</dt>
        <dd>Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
    commodo consequat.</dd>
        <dt>Lorem ipsum dolor sit amet</dt>
        <dd>Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
    commodo consequat.</dd>
    </dl>
        <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fdzrhtv%2Fposts%2F1258704302959553&width=552&show_text=true&appId=4243265859043855&height=547" width="552" height="547" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>

        <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/reel/DPoTJMyCXw5/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/reel/DPoTJMyCXw5/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/reel/DPoTJMyCXw5/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by Radyo Natin Nationwide (@radyonatinofficial)</a></p></div></blockquote>
        <script async src="//www.instagram.com/embed.js"></script>

        <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@rnnationwide/video/7537336211120082196" data-video-id="7537336211120082196" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@rnnationwide" href="https://www.tiktok.com/@rnnationwide?refer=embed">@rnnationwide</a> Ayon kay Sen. Panfilo Lacson, may patong umanong 5%–6% sa ilang proyekto ng gobyerno na nagdudulot ng mababang kalidad na paggawa. <a title="radyonatinnews" target="_blank" href="https://www.tiktok.com/tag/radyonatinnews?refer=embed">#RadyoNatinNews</a> <a title="newsph" target="_blank" href="https://www.tiktok.com/tag/newsph?refer=embed">#NewsPH</a> <a title="lacson" target="_blank" href="https://www.tiktok.com/tag/lacson?refer=embed">#Lacson</a> <a title="infrastructure" target="_blank" href="https://www.tiktok.com/tag/infrastructure?refer=embed">#Infrastructure</a> <a title="philippines" target="_blank" href="https://www.tiktok.com/tag/philippines?refer=embed">#Philippines</a> <a title="fyp" target="_blank" href="https://www.tiktok.com/tag/fyp?refer=embed">#fyp</a> <a title="foryoupage" target="_blank" href="https://www.tiktok.com/tag/foryoupage?refer=embed">#foryoupage</a> <a target="_blank" title="♬ original sound  - Radyo Natin Nationwide" href="https://www.tiktok.com/music/original-sound-Radyo-Natin-Nationwide-7537336314295880465?refer=embed">♬ original sound  - Radyo Natin Nationwide</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>

        <blockquote class="twitter-tweet"><p lang="tl" dir="ltr">Jake Zyrus, dating kilala bilang Charice Pempengco, muling magpapakilig sa fans sa pamamagitan ng kanyang reimagined versions ng mga paboritong kanta sa paparating niyang EP na “Roots” ngayong November 2025. <a href="https://twitter.com/hashtag/MusicNews?src=hash&amp;ref_src=twsrc%5Etfw">#MusicNews</a> <a href="https://twitter.com/hashtag/JakeZyrus?src=hash&amp;ref_src=twsrc%5Etfw">#JakeZyrus</a><br><br>📷: Instagram/Jake Zyrus <a href="https://t.co/1TG4AH849Y">pic.twitter.com/1TG4AH849Y</a></p>&mdash; Radyo Natin Nationwide (@RNNationwide) <a href="https://twitter.com/RNNationwide/status/1976603917669589419?ref_src=twsrc%5Etfw">October 10, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

        <image src="https://picsum.photos/800/400" alt="Sample" width="800" height="400" style="display: block;" /> 
    `

    return (
        <div className="flex flex-col xl:flex-row gap-5 p-5">
            <div className="flex-1">
                <div className={open_sans.className}>
                    <div className="relative aspect-3/2 w-full bg-gray-200 rounded-xl overflow-hidden">
                        <Image src={`https://picsum.photos/600/400`} alt="sample" fill
                            className="absolute inset-0 object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-gradient-start opacity-80 mt-1/3" />
                    </div>
                    <h2 className="text-3xl font-extrabold mt-5 mb-3">Castro on Magalong&#39;s ICI exit: &#39;Siya po ang boluntaryong nag-resign, hindi naman siya pinag-reresign&#39;</h2>
                    <p className="text-sm">January 01, 2026</p>
                </div>
                <ContentComponent content={sampleContent} className={cn("mt-4 leading-loose font-semibold", open_sans.className)} />
                <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-xs font-semibold mr-1">Tags: </span>
                    {new Array(4).fill("Tag long ones").map((tag, index) => (
                        <span key={index} className="text-xs border-1 rounded-xs border-neutral-600 px-2 py-1">{tag} {index}</span>
                    ))}
                </div>
                <div className="flex gap-2 mt-5 items-center font-semibold">
                    <span className="text-xs">Share</span>
                    <FacebookShareComponent />
                    <TwitterShareComponent />
                    <SocialSharingButton className="w-8 h-8 cursor-pointer" />
                </div>
            </div>
            <div className="w-full xl:w-right-sidebar-width">
                <LatestStoriesComponent />
                <div className="sticky top-5">
                    <div className="flex justify-center items-center mb-3">
                        <div className="relative h-[250px] w-[300px] bg-gray-300 my-5">
                            <Image src={`https://picsum.photos/600/400?random=${Math.floor(Math.random() * 10) + 1}`} alt="Sample"
                                fill
                                className="absolute inset-0 object-cover" />
                        </div>
                    </div>
                    <div className="flex justify-center items-center mb-3">
                        <div className="relative h-[250px] w-[300px] bg-gray-300 my-5">
                            <Image src={`https://picsum.photos/600/400?random=${Math.floor(Math.random() * 10) + 1}`} alt="Sample"
                                fill
                                className="absolute inset-0 object-cover" />
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

// app/homepage/page.tsx
"use client"
import { } from "react";
import { PostType } from "@s/types/postType";
import Navbar from "@f/homepage/components/Navbar";
import PostCard from "@f/homepage/components/PostCard";

let postList: PostType[] = [
  new PostType("Test1", "BodyText"),
  new PostType("Test2", "Realllllllllyyyyyy long Body Text"),
  new PostType("Test3", "Realllllllllyyyyyy long Body Text, with some **markdown**"),
  new PostType("Test4 Realllllllllyyyyyy Realllllllllyyyyyy Text", "Realllllllllyyyyyy lRealllllllllyyyyyy long Body Text, with some **markdown**aaaaaaaaaaaafjwje oijeowjfoiwjfoieajfoij oeijo ijaoi joifj oiajofi joai jfoiajoifaj oiwjf oiawj oij oawjio jawoi jwaoij waoj aiowj ioawj oiawj oijafiojoi joiajoifj aiojf oiajoifjaoghiuwhguh iwoi joiw joifjaoijfoiawjfoiwjfoi joaj fioja oifjaiojfiowjfoiwajofiejaoidfjaoije o oijfaoij foaijf ioaje fjioaejfioej oiaj fioajoi feawoijfoiadjioej oifjoifjoiajjeoijfaio i oijfaoij foaijf ioaje fjioaejfioej oiaj fioajoi feawoijfoiadjioej oifjoifjoiajjeoijfaio j oijfaoij foaijf ioaje fjioaejfioej oiaj fioajoi feawoijfoiadjioej oifjoifjoiajjeoijfaio f oijfaoij foaijf ioaje fjioaejfioej oiaj fioajoi feawoijfoiadjioej oifjoifjoiajjeoijfaio a oijfaoij foaijf ioaje fjioaejfioej oiaj fioajoi feawoijfoiadjioej oifjoifjoiajjeoijfaio oij foaijf ioaje fjioaejfioej oRealllllllllyyyyyy long Body Text, with some **markdown**aaaaaaaaaaaafjwje oijeowjfoiwjfoieajfoij oeijo ijaoi joifj oiajofi joai jfoiajoifaj oiwjf oiawj oij oawjio jawoi jwaoij waoj aiowj ioawj oiawj oijafiojoi joiajoifj aiojf oiajoifjaoghiuwhguh iwoi joiw joifjaoijfoiawjfoiwjfoi joaj fioja oifjaiojfiowjfoiwajofiejaoidfjaoije o oijfaoij foaijf ioaje fjioaejfioej oiaj fioajoi feawoijfoiadjioej oifjoifjoiajjeoijfaio i oijfaoij foaijf ioaje fjioaejfioej oiaj fioajoi feawoijfoiadjioej oifjoifjoiajjeoijfaio j oijfaoij foaijf ioaje fjioaejfioej oiaj fioajoi feawoijfoiadjioej oifjoifjoiajjeoijfaio f oijfaoij foaijf ioaje fjioaejfioej oiaj fioajoi feawoijfoiadjioej oifjoifjoiajjeoijfaio a oijfaoij foaijf ioaje fjioaejfioej oiaj fioajoi feawoijfoiadjioej oifjoifjoiajjeoijfaio oij foaijf ioaje fjioaejfioej oRealllllllllyyyyyy long Body Text, with some **markdown**aaaaaaaaaaaafjwje oijeowjfoiwjfoieajfoij oeijo ijaoi joifj oiajofi joai jfoiajoifaj oiwjf oiawj oij oawjio jawoi jwaoij waoj aiowj ioawj oiawj oijafiojoi joiajoifj aiojf oiajoifjaoghiuwhguh iwoi joiw joifjaoijfoiawjfoiwjfoi joaj fioja oifjaiojfiowjfoiwajofiejaoidfjaoije o oijfaoij foaijf ioaje fjioaejfioej oiaj fioajoi feawoijfoiadjioej oifjoifjoiajjeoijfaio i oijfaoij foaijf ioaje fjioaejfioej oiaj fioajoi feawoijfoiadjioej oifjoifjoiajjeoijfaio j oijfaoij foaijf ioaje fjioaejfioej oiaj fioajoi feawoijfoiadjioej oifjoifjoiajjeoijfaio f oijfaoij foaijf ioaje fjioaejfioej oiaj fioajoi feawoijfoiadjioej oifjoifjoiajjeoijfaio a oijfaoij foaijf ioaje fjioaejfioej oiaj fioajoi feawoijfoiadjioej oifjoifjoiajjeoijfaio oij foaijf ioaje fjioaejfioej \noong Body Text, with some **markdown**aaaaaaaaaaaafjwje oijeowjfoiwjfoieajfoij oeijo ijaoi joifj oiajofi joai jfoiajoifaj oiwjf oiawj oij oawjio jawoi jwaoij waoj aiowj ioawj oiawj oijafiojoi joiajoifj aiojf oiajoifjaoghiuwhguh iwoi joiw joifjaoijfoiawjfoiwjfoi joaj fioja oifjaiojfiowjfoiwajofiejaoidfjaoije o oijfaoij foaijf ioaje fjioaejfioej oiaj fioajoi feawoijfoiadjioej oifjoifjoiajjeoijfaio i oijfaoij foaijf ioaje fjioaejfioej oiaj fioajoi feawoijfoiadjioej oifjoifjoiajjeoijfaio j oijfaoij foaijf ioaje fjioaejfioej oiaj fioajoi feawoijfoiadjioej oifjoifjoiajjeoijfaio f oijfaoij foaijf ioaje fjioaejfioej oiaj fioajoi feawoijfoiadjioej oifjoifjoiajjeoijfaio a oijfaoij foaijf ioaje fjioaejfioej oiaj fioajoi feawoijfoiadjioej oifjoifjoiajjeoijfaio oij foaijf ioaje fjioaejfioej oiaj fioajoi feawoijfoiadjioej oifjoifjoiajjeoijfaio oiefjqoijfeoiajoifejwoi"),
  new PostType("Test1", "BodyText"),
  new PostType("Test1", "BodyText"),
  new PostType("Test1", "BodyText"),
  new PostType("Test1", "BodyText"),
  new PostType("Test1", "BodyText"),
]

const Homepage = () => {
  return (
    <div>
      <Navbar />

      <div className="flex flex-col items-center w-full space-y-4 px-4 mt-4">
        {postList.map((post, idx) => (
          <PostCard key={idx} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Homepage;

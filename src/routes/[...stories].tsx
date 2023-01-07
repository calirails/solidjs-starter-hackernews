import { Component, createResource, For, Show } from "solid-js";
import { A, RouteDataArgs, useRouteData } from "solid-start";
import { isServer } from "solid-js/web";
import Story from "~/components/story";
import fetchAPI from "~/lib/api";
import { IStory } from "~/types";

const mapStories = {
  top: "news",
  new: "newest",
  show: "show",
  ask: "ask",
  job: "jobs",
} as const;

/* NOTE!: routeData is mirrored on client and server.
 * On initial visit; i.e. this function will be triggered to load data server side.
 * Note; however, there is also client side, in-browser execution. Redundant?
 * Not necessarily, this is known as isomorphic execution that allows every
 * subsequent navigation triggered by pagination within the browser to execute
 * strictly client side to appear to execute "just like" the initial page render.
 */
export const routeData = ({ location, params }: RouteDataArgs) => {
  // NOTE: this creates a reactive binding via a function that
  // evaluates to the extracted page number via ?page={page-number}
  const pageSequence = +location.query.page;

  // WARNING!: always remove debuggers from code PRs.
  // It is required for me to get VSCode to attach any breakpoints
  // but should not be necessary if project is setup with VSCode correctly.
  // debugger;
  // console.table({
  //   isServer: isServer,
  //   seq: pageSequence,
  //   page: pageSequence || 1,
  // });
  const page = () => +location.query.page || 1;

  // NOTE!: "type" is overloaded and in this context, simply refers to the type
  // It's a function that provides a reactive binding that evaluates the path from
  // the url: /root/{path} which is assigned into `params.stories` by virtue
  // the url: /root/{path} which is nested from the root path and having
  // the url: /root/{path} which is
  // const type = () => (params.stories || "top") as keyof typeof mapStories;
  const type = () => (params.stories || "top") as keyof typeof mapStories;

  // NOTE!: creating a more clearly named reference to the type reactive binding
  const headlineType = type;

  // NOTE!: this creates an auto-triggered fetch that reactively
  // trigger whenever the anonymous function's evaluated result
  // changes in response to click events by a user or a bot
  // navigates across the site by altering either.
  // a) "type" of Hackernews stories; i.e. top (headlines), newest, show, ask, or jobs
  // b) "page" the page number during pagination
  // that either changes due to
  const [stories] = createResource<IStory[], string>(
    () => `${mapStories[headlineType()]}?page=${page()}`,
    fetchAPI
  );

  // console.log(
  //   "Stories::routeData values of {page, headlineType, stories}",
  //   page,
  //   headlineType,
  //   stories
  // );
  return { headlineType, stories, page };
};

const Stories: Component = () => {
  const { page, headlineType, stories } = useRouteData<typeof routeData>();
  // console.log(
  //   "Stories::ctor values of {page, headlineType, stories}",
  //   page,
  //   headlineType,
  //   stories
  // );
  return (
    <div class="news-view">
      <div class="news-list-nav">
        {/* Previous Page Navigator */}
        <Show
          when={page() > 1}
          fallback={
            <span class="page-link disabled" aria-disabled="true">
              {"<"} Previous
            </span>
          }
        >
          <A
            class="page-link"
            href={`/${headlineType()}?page=${page() - 1}`}
            aria-label="Previous"
          >
            {"<"} Previous
          </A>
        </Show>

        {/* Current Page */}
        <span> Page Number: {page()}</span>

        {/* Next Page Navigator */}
        <Show
          when={stories() && stories()!.length >= 29}
          fallback={
            <span class="page-link disabled" aria-disabled="true">
              more {">"}
            </span>
          }
        >
          <A
            class="page-link"
            href={`/${headlineType()}?page=${page() + 1}`}
            aria-label="Next"
          >
            Next {">"}
          </A>
        </Show>
      </div>
      <main class="news-list">
        <Show when={stories()}>
          <ul>
            <For each={stories()}>{(story) => <Story story={story} />}</For>
          </ul>
        </Show>
      </main>
    </div>
  );
};

export default Stories;

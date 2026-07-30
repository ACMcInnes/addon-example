import { notFound } from 'next/navigation'
import { formatDate, getMarkdoc } from 'app/documentation/utils'
import Markdoc from '@markdoc/markdoc'
import React from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export async function generateStaticParams() {
  let pages = getMarkdoc()

  return pages.map((page) => ({
    slug: page.slug,
  }))
}

export default async function Documentation(
  props: {
    params: Promise<{ slug: string }>
  }
) {
  const params = await props.params;
  let page = getMarkdoc().find((page) => page.slug === params.slug)

  if (!page) {
    notFound()
  }

  console.log(`Markdoc found: ${page.slug}`);
  // console.log(page.slug);
  // console.log(page.metadata);
  // console.log(page.content);

  const components = {};

  // console.log(`Markdoc rendered`)
  // console.log(renderedContent);

  return (
    <>
      <p className="title font-semibold text-5xl mt-8">
        <FontAwesomeIcon icon={['fas', page.metadata.icon] as IconProp} className="mb-2"/>
      </p>
      <h1 className="title font-semibold text-5xl">
        {page.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-4 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Last updated: {formatDate(page.metadata.published)}
        </p>
      </div>
      <div className="max-w-full lg:max-w-(--breakpoint-sm) xl:max-w-(--breakpoint-lg) 2xl:max-w-(--breakpoint-xl) prose dark:prose-invert prose-headings:mt-8 prose-headings:font-semibold prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg">
        {page.content ? (
          Markdoc.renderers.react(page.content, React as any, { components })
        ) : (
          <p>Check back soon, this page is still under construction</p>
        )}
      </div>
    </>
  )
}

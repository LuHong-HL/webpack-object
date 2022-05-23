const fn = async () => {
  const res = await Promise.resolve('babel test')
  console.log(res)
}

fn()

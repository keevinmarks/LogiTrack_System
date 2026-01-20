
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs' 

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed (Manaus Edition)...')

  // COMANDO PARA LIMPAR TODOS OS DADOS EXISTENTES
  await prisma.delivery.deleteMany()
  await prisma.route.deleteMany() 
  await prisma.driver.deleteMany()
  await prisma.user.deleteMany() 
  //===============================================

  
  const passwordHash = await hash('123456', 8)

  await prisma.user.create({
    data: {
      name: 'Kevin Marques',
      email: 'admin@logitrack.com',
      password: passwordHash,
      role: 'MANAGER'
    }
  })
  console.log('👤 Usuário Admin criado: admin@logitrack.com / 123456')


  await prisma.driver.createMany({
    data: [
      { name: 'Carlos Silva', licensePlate: 'AM-1234', vehicleModel: 'Fiorino' },
      { name: 'João Souza', licensePlate: 'AM-9988', vehicleModel: 'Van Ducato' },
      { name: 'Pedro Santos', licensePlate: 'AM-5566', vehicleModel: 'Caminhão VUC' },
    ]
  })


  const deliveries = [
    { customerName: "Supermercado DB", address: "Av. Ephigênio Salles, Aleixo", latitude: -3.0933, longitude: -60.0075, status: "PENDING" },
    { customerName: "Bemol Shopping", address: "Av. Djalma Batista, Chapada", latitude: -3.1044, longitude: -60.0242, status: "PENDING" },
    { customerName: "Restaurante Banzeiro", address: "Rua Libertador, Nossa Sra. das Graças", latitude: -3.1112, longitude: -60.0267, status: "IN_TRANSIT" },
    { customerName: "Amazonas Shopping", address: "Av. Djalma Batista, 482", latitude: -3.1065, longitude: -60.0238, status: "DELIVERED" },
    { customerName: "Drogaria Santo Remédio", address: "Av. André Araújo, Aleixo", latitude: -3.1018, longitude: -60.0049, status: "PENDING" },
    { customerName: "UEA - Escola Superior", address: "Av. Darcy Vargas, Parque 10", latitude: -3.0950, longitude: -60.0160, status: "PENDING" },
    { customerName: "Teatro Amazonas", address: "Largo de São Sebastião, Centro", latitude: -3.1302, longitude: -60.0234, status: "DELIVERED" },
    { customerName: "Manauara Shopping", address: "Av. Mário Ypiranga, Adrianópolis", latitude: -3.1057, longitude: -60.0104, status: "IN_TRANSIT" },
    { customerName: "INPA - Bosque da Ciência", address: "Rua Bem-te-vi, Petrópolis", latitude: -3.0968, longitude: -59.9876, status: "PENDING" },
    { customerName: "Arena da Amazônia", address: "Av. Constantino Nery, Flores", latitude: -3.0841, longitude: -60.0270, status: "PENDING" },
    { customerName: "Havan Manaus", address: "Av. das Torres, Cidade Nova", latitude: -3.0485, longitude: -59.9982, status: "PENDING" },
    { customerName: "Ponta Negra Center", address: "Av. Coronel Teixeira, Ponta Negra", latitude: -3.0725, longitude: -60.0900, status: "DELIVERED" },
    { customerName: "Aeroporto Eduardo Gomes", address: "Av. Santos Dumont, Tarumã", latitude: -3.0392, longitude: -60.0506, status: "PENDING" },
    { customerName: "Distrito Industrial I", address: "Av. Buriti, Distrito", latitude: -3.1432, longitude: -59.9754, status: "IN_TRANSIT" },
    { customerName: "Hospital 28 de Agosto", address: "Av. Mário Ypiranga, Adrianópolis", latitude: -3.1080, longitude: -60.0125, status: "DELIVERED" },
    { customerName: "Sumaúma Park Shopping", address: "Av. Noel Nutels, Cidade Nova", latitude: -3.0365, longitude: -59.9958, status: "PENDING" },
    { customerName: "Porto de Manaus", address: "Rua Taqueirinha, Centro", latitude: -3.1415, longitude: -60.0248, status: "DELIVERED" },
    { customerName: "UFAM - Campus", address: "Av. Gen. Rodrigo Octávio, Coroado", latitude: -3.0995, longitude: -59.9654, status: "PENDING" },
    { customerName: "Nova Era Superatacado", address: "Av. Torquato Tapajós, Flores", latitude: -3.0654, longitude: -60.0255, status: "PENDING" },
    { customerName: "Mercado Adolpho Lisboa", address: "Rua dos Barés, Centro", latitude: -3.1398, longitude: -60.0232, status: "IN_TRANSIT" }
  ]


  await prisma.delivery.createMany({
    data: deliveries as any 
  })

  console.log('✅ Seed finalizado! 20 entregas, 3 motoristas e 1 Admin criados.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })